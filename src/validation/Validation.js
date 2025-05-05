import * as yup from "yup";

export const login = yup.object({
  email: yup.string().email("Enter Valid Email").required(),
  password: yup.string().required().min(2, "Enter Atleast 2 Letter"),
});

export const register = yup.object({
  name: yup.string().required().min(2, "Enter Atleast 2 Letter"),
  email: yup.string().email("Enter Valid Email").required(),
  password: yup.string().required(),
  cnfPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password Must Be Matched"),
});
