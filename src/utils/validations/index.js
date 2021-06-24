export const getString = (value = "") => (value || "").toString().trim();

export const validatedEmail = (value = "") => {
  const regex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return regex.test(getString(value));
};

export const validatedPassword = (value = "") => {
  const regex = new RegExp(/^(?=.*?[0-9])(?=.*?([^\w\s]|[_])).{8,}$/);
  return regex.test(getString(value));
};

export const requiredCheck = (values, valuePath) => {
  if (!getString(values[String(valuePath)])) {
    return "Required";
  }
  return null;
};
