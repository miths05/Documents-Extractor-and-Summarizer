import React, { useContext, useEffect, useRef, useState } from "react";
import { Table } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { GetRef, InputRef, TableProps, Form, Input } from "antd";
import "./DataTracker.css";
import {
  generateFieldList,
  getCompletionStyle,
  getStatusStyle,
} from "../../constants/constants";
import { Colors } from "../../constants/constantsUi";
import CustomEditableModal from "../Custom/CustomEditableModal";
import { ReportEntry, MainEntry } from "../../constants/DataGeneration";
import {
  useDataSourceDispatch,
  useDataSourceState,
} from "../../context/DataSourceContext";

type FormInstance<T> = GetRef<typeof Form<T>>;


const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  pages: number;
  status: string;
  DueDate: string;
  ActualCompletion: string;
  ManagerReview: boolean;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  // if (editable) {
  //   childNode = editing ? (
  //     <Form.Item
  //       style={{ margin: 0 }}
  //       name={dataIndex}
  //       rules={[{ required: true, message: ${title} is required. }]}
  //     >
  //       <Input ref={inputRef} onPressEnter={save} onBlur={save} />
  //     </Form.Item>
  //   ) : (
  //     <div
  //       className="editable-cell-value-wrap"
  //       style={{ paddingInlineEnd: 24 }}
  //       onClick={toggleEdit}
  //     >
  //       {children}
  //     </div>
  //   );
  // }

  return <td {...restProps}>{childNode}</td>;
};

type props = {
  dataSource: any;
  onRowSelect?: (record: any) => void;
  visibleColumns: string[];
  selectable?: boolean;
  editable?: boolean;
  modalVisible?: boolean;
  setOpen?: Function;
  step?: number;
};

type ColumnTypes = Exclude<
  TableProps<MainEntry | ReportEntry>["columns"],
  undefined
>;

// Define the custom order for statuses
const statusOrderAscending = ["New", "Work in progress", "Complete"];
const statusOrderDescending = ["Complete", "Work in progress", "New"];

// Sort function for ascending/descending order
const sortStatus = (a: MainEntry, b: MainEntry, ascending: boolean): number => {
  const order = ascending ? statusOrderAscending : statusOrderDescending;
  const aIndex = order.indexOf(a.status);
  const bIndex = order.indexOf(b.status);

  return aIndex - bIndex; // This will work for both ascending and descending based on how the order is defined.
};

// rowSelection object indicates the need for row selection

const DataTrackerr: React.FC<props> = ({
  dataSource,
  visibleColumns,
  onRowSelect = () => {},
  selectable = true,
  editable = false,
  modalVisible = false,
  step = 0,
  setOpen = () => {
    return;
  },
}) => {
  const [dataSourceNew, setDataSource] = useState<MainEntry[] | ReportEntry[]>(
    []
  );
  console.log("TrackkerFile::", dataSourceNew, dataSource);
  const dataDispatch = useDataSourceDispatch();
  React.useEffect(() => {
    if (dataSourceNew.length === 0) {
      console.log("Tracker data entered");
      setDataSource(dataSource);
    }
  }, [dataSource]);
  const handleSave = (row: ReportEntry) => {
    const newData: any = [...dataSourceNew];
    const index = newData.findIndex(
      (item: { key: React.Key }) => row.key === item.key
    );
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
    dataDispatch({ type: "SET_INTERNAL_DATA_SOURCE", payload: newData });
  };
  const [acceptedRows, setAcceptedRows] = useState<React.Key[]>([]); // Track accepted rows

  const handleAccept = (record: ReportEntry) => {
    setAcceptedRows((prev) =>
      prev.includes(record.key)
        ? prev.filter((key) => key !== record.key)
        : [...prev, record.key]
    );
  };

  const onCreate = (values: any) => {
    console.log("Values:::", values);
    const dataSet: any = {
      key: 1,
      doctorName: values.doctorName,
      report: values.report,
      reportType: values.reportType,
      startPage: values.startPage,
      endPage: values.endPage,
      pages: Number(values.endPage) - Number(values.startPage),
      confidenceScore: values.confidenceScore,
      actionForUser: values.actionForUser,
      summary: values.summary,
    };
    const updatedDataSource = dataSourceNew.map((item) => ({
      ...item,
      key: (Number(item.key) + 1).toString(),
    }));
    setDataSource([dataSet, ...updatedDataSource]);
    dataDispatch({
      type: "SET_INTERNAL_DATA_SOURCE",
      payload: [dataSet, ...updatedDataSource],
    });
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "#SR",
      dataIndex: "key",
      width: 60,
      className: "ant-table-cell-center",
    },
    {
      title: "Document Name",
      dataIndex: "documentName",
      width: 150,
      className: "ant-table-cell-center",
      editable: editable,
    },
    {
      title: "No of Pages",
      dataIndex: "pages",
      width: 90,
      render: (pages: number) => <span>{pages === 0 ? "N/A" : pages}</span>,
      className: "ant-table-cell-center",
      editable: editable,
    },
    {
      title: "Doctor Name",
      dataIndex: "doctorName",
      width: 150,
      className: "ant-table-cell-left",
      editable: editable,
    },
    {
      title: "Report",
      dataIndex: "report",
      width: 150,
      className: "ant-table-cell-left",
      editable: editable,
    },
    {
      title: "Report Type",
      dataIndex: "reportType",
      width: 150,
      className: "ant-table-cell-left",
      editable: editable,
    },
    {
      title: "Start Page",
      dataIndex: "startPage",
      width: 100,
      className: "ant-table-cell-left",
      editable: editable,
      //Add this back if you only want to make a specific column editable.
      // onCell: (record: DataType) => ({
      //   record,
      //   editable: editable && record.status !== "Complete", // Editable only if status is not "Complete"
      //   dataIndex: "startPage",
      //   title: "Start Page",
      //   handleSave,
      // }),
    },
    {
      title: "End Page",
      dataIndex: "endPage",
      width: 100,
      className: "ant-table-cell-left",
      editable: editable,
      //Add this back if you only want to make a specific column editable.
      // onCell: (record: DataType) => ({
      //   record,
      //   editable: editable && record.status !== "Complete", // Make this editable similarly if needed
      //   dataIndex: "endPage",
      //   title: "End Page",
      //   handleSave,
      // }),
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: (a: any, b: any) => sortStatus(a, b, true),
      render: (status: string) => (
        <span style={getStatusStyle(status)}>{status}</span>
      ),
      className: "ant-table-cell-left",
      editable: editable,
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      className: "ant-table-cell-left",
      editable: editable,
    },
    {
      title: "Actual Completion",
      dataIndex: "actualCompletion",
      render: (actualCompletion: string, record: MainEntry | any) => (
        <span style={getCompletionStyle(record.dueDate, actualCompletion)}>
          {actualCompletion || "N/A"}
        </span>
      ),
      className: "ant-table-cell-left",
      editable: editable,
    },
    
    {
      title: "Manager Review",
      dataIndex: "managerReview",
      width: 110,
      render: (isReviewed: boolean) => (
        <CheckCircleFilled
          style={{
            color: isReviewed ? "green" : "gray",
            fontSize: 30,
          }}
        />
      ),
      className: "ant-table-cell-center",
    },
    {
      title: "Accept",
      dataIndex: "operation",
      width: 80,
      fixed: "right",
      render: (text: string, record: any) => (
        <div onClick={() => handleAccept(record)}>
          <CheckCircleFilled
            style={{
              color: acceptedRows.includes(record.key) ? "green" : "gray",
              fontSize: 20,
              cursor: "pointer", // Add pointer cursor for better UX
            }}
          />
        </div>
      ),
      className: "ant-table-cell-center",
    },
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns
    .filter((column) => visibleColumns.includes(column.dataIndex as string))
    .map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: MainEntry | ReportEntry) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave,
        }),
      };
    });

  // Adding this for onCell in the columns or else use the above one and make the onCell just editable:true
  // const columns = defaultColumns.filter((column) =>
  //   visibleColumns.includes(column.dataIndex as string)
  // );

  const rowSelection: TableProps<any>["rowSelection"] = selectable
    ? {
        type: "radio", // Switch to radio selection
        onChange: (
          selectedRowKeys: React.Key[],
          selectedRows: MainEntry[] | ReportEntry[]
        ) => {
          console.log("Row Selected:", selectedRows);
          if (selectedRows.length && step === 0) {
            dataDispatch({
              type: "SET_DATA_SOURCE",
              payload: selectedRows[0] as any,
            });
          } else {
            onRowSelect(selectedRows[0]);
          }
        },
        //   Disabled check
       
      }
    : undefined;
  const formList = [
    "key",
    "doctorName",
    "report",
    "reportType",
    "startPage",
    "endPage",
    "confidenceScore",
    "actionForUser",
    "summary",
    "operation",
  ];
  return (
    <div className="Apptracker">
      <Table<MainEntry | ReportEntry>
        columns={columns as ColumnTypes}
        dataSource={dataSourceNew}
        components={components}
        rowSelection={rowSelection}
        scroll={{ y: 55 * 13, scrollToFirstRowOnChange: true }}
        style={{ color: Colors.blackBG, height: "100%", fontSize: "22px" }}
        pagination={{
          className: "custom-pagination",
          pageSize: 20,
          showSizeChanger: false,
        }}
        rowClassName={() => "editable-row"}
      />
      <CustomEditableModal
        visible={modalVisible}
        onCreate={onCreate}
        onCancel={setOpen}
        loading={false}
        list={generateFieldList(
          formList.filter(
            (column) => column !== "key" && column !== "operation"
          )
        )}
      />
    </div>
  );
};

export default DataTrackerr;
