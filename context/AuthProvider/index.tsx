import { createContext, useReducer, Dispatch } from "react";
import { authReducer } from "./reducer";

type InitialStateType = {
  user: { [key: string]: any };
  //   token: string;
};

const initialState = {
  user: {},
  //   token: "",
};

export const AuthContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ user }: InitialStateType, action: any) => ({
  user: authReducer(user, action),
});

export const AuthProvider: React.FC = ({ children }): React.ReactElement => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
