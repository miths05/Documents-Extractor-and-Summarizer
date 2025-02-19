import React, { useContext } from "react";
import type { GetRef, InputRef, TableProps } from "antd";
import { Form } from "antd";

type FormInstance<T> = GetRef<typeof Form<T>>;
const EditableContext = React.createContext<FormInstance<any> | null>(null);

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

export const useEditableRow = () => {
  const context = useContext(EditableContext);
  if (!context) {
    throw new Error("useEditableRow must be used within an EditableRow");
  }
  return context;
};

export default EditableRow;
