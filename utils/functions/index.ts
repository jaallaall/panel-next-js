export const omit = (prop: any, { [prop]: _, ...rest }) => rest;

export const seprate = (x: number) => {
  if (x) {
    return x.toLocaleString("fa-EG");
  }
  return 0;
};
