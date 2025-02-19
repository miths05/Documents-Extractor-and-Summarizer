import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";

// Define the shape of the row data
interface DataSourceItem {
  key: React.Key;
  srNo: number;
  documentName: string;
  status: string;
  dueDate: string;
  actualCompletion: string | "N/A";
  managerReview: boolean;
  attachment?: string;
  data: Array<{
    key: React.Key;
    doctorName: string;
    report: string;
    reportType: string;
    startPage: number;
    endPage: number;
    pages: number;
    confidenceScore: number | "N/A";
    actionForUser: string;
    summary: string;
    attachment?: string;
    driveLink: string;
  }>;
}

// Define actions for the data source state
type DataSourceAction =
  | { type: "SET_DATA_SOURCE"; payload: DataSourceItem }
  | { type: "SET_INTERNAL_DATA_SOURCE"; payload: any }
  | { type: "CLEAR_DATA_SOURCE" };

// Initial data source state
const initialDataSourceState: DataSourceItem | null = null;

// Create the DataSourceContext
const DataSourceContext = createContext<
  | {
      state: DataSourceItem | null;
      dispatch: React.Dispatch<DataSourceAction>;
    }
  | undefined
>(undefined);

// Data source reducer function
const dataSourceReducer = (
  state: DataSourceItem | null,
  action: DataSourceAction
): DataSourceItem | null => {
  switch (action.type) {
    case "SET_DATA_SOURCE":
      return action.payload;
    case "SET_INTERNAL_DATA_SOURCE":
      // Update only the data array
      if (state) {
        return {
          ...state,
          data: action.payload, // Assuming payload is the new data array
        };
      }
      return state;
    case "CLEAR_DATA_SOURCE":
      return initialDataSourceState;
    default:
      return state;
  }
};

// DataSourceProvider component
const DataSourceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Function to initialize state from local storage
  const getInitialState = (): DataSourceItem | null => {
    const savedData = localStorage.getItem("selectedData");
    return savedData ? JSON.parse(savedData) : initialDataSourceState;
  };

  const [state, dispatch] = useReducer(dataSourceReducer, getInitialState());

  // Save data to local storage whenever the state changes
  useEffect(() => {
    if (state) {
      localStorage.setItem("selectedData", JSON.stringify(state));
    }
  }, [state]);

  return (
    <DataSourceContext.Provider value={{ state, dispatch }}>
      {children}
    </DataSourceContext.Provider>
  );
};

// Custom hooks
const useDataSourceState = () => {
  const context = useContext(DataSourceContext);
  if (!context) {
    throw new Error(
      "useDataSourceState must be used within a DataSourceProvider"
    );
  }
  return context.state;
};

const useDataSourceDispatch = () => {
  const context = useContext(DataSourceContext);
  if (!context) {
    throw new Error(
      "useDataSourceDispatch must be used within a DataSourceProvider"
    );
  }
  return context.dispatch;
};

// Export the provider and hooks
export { DataSourceProvider, useDataSourceState, useDataSourceDispatch };
