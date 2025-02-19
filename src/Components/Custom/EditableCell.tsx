import React, { useState } from "react";
import { Input } from "antd";

interface EditableCellProps {
  title: string;
  editable: boolean;
  children: React.ReactNode | any;
  dataIndex: string;
  record: any; // Change to specific data type if needed
  handleSave: (row: any) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const save = async (e: any) => {
    try {
      const value = e.target.value;
      toggleEdit();
      handleSave({ ...record, [dataIndex]: value });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  return (
    <td {...restProps} onClick={editable ? toggleEdit : undefined}>
      {editable && editing ? (
        <Input defaultValue={children} onPressEnter={save} onBlur={save} />
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
