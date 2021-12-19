export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "Reg":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
