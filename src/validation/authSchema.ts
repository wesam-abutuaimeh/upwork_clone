import * as Yup from "yup";

export const registrationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid Email"
    )
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    )
    .required("Password is required"),
  agreement: Yup.boolean()
    .oneOf([true], "You must agree to our Policy")
    .required("You must agree to our Policy"),
});
