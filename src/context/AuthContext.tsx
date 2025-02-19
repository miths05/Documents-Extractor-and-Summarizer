import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";

// Define the shape of the authentication state
interface AuthState {
  username: string;
  email: string;
  phoneNumber: string;
  id: string;
  isLoggedin: boolean;
}

// Define actions for the auth state
type AuthAction =
  | { type: "SET_AUTH_DATA"; payload: AuthState }
  | { type: "CLEAR_AUTH_DATA" };

// Initial authentication state
const initialAuthState: AuthState = {
  username: "",
  email: "",
  phoneNumber: "",
  id: "",
  isLoggedin: false,
};

// Create the AuthContext
const AuthContext = createContext<
  | {
      state: AuthState;
      dispatch: React.Dispatch<AuthAction>;
    }
  | undefined
>(undefined);

// Auth reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_AUTH_DATA":
      return { ...state, ...action.payload };
    case "CLEAR_AUTH_DATA":
      return initialAuthState;
    default:
      return state;
  }
};

// AuthProvider component
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Function to initialize state from local storage
  const getInitialState = (): AuthState => {
    const savedData = localStorage.getItem("authState");
    return savedData ? JSON.parse(savedData) : initialAuthState;
  };

  const [state, dispatch] = useReducer(authReducer, getInitialState());

  // Save data to local storage whenever the state changes
  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(state));
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hooks
const useAuthState = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthState must be used within an AuthProvider");
  }
  return context.state;
};

const useAuthDispatch = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthDispatch must be used within an AuthProvider");
  }
  return context.dispatch;
};

export { AuthProvider, useAuthState, useAuthDispatch };
