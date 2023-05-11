/* eslint-disable @typescript-eslint/no-explicit-any */
export const required = (value: any) =>
  value ? undefined : "This field is required";

export const conditionalRequired = (value: any, allValues: any) => {
  const { type } = allValues;
  if (type === "pizza" && !value) {
    return "This field is required for pizza";
  } else if (type === "soup" && !value) {
    return "This field is required for soup";
  } else if (type === "sandwich" && !value) {
    return "This field is required for sandwich";
  }

  return undefined;
};
