"use client";
import React from "react";
import Input from "../form/Input";
import { Button } from "flowbite-react";
import ButtonLoading from "../button/ButtonLoading";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "@/lib/context/SnackbarContext";
import { useLoginUserMutation } from "@/lib/api/authApi";
const initialValues = {
  email: "",
  password: "",
};
const UserSchema = yup.object({
  email: yup
    .string()
    .email("Assurez-vous que le courriel est valide.")
    .required("Ce courriel est requis."),
  password: yup.string().required("Il est nécessaire d'avoir ce mot de passe"),
});
export default function LoginForm() {
  const { showSnackbar } = useSnackbar();
  const [loginUser, responseLoginUser] = useLoginUserMutation();
  const formik = useFormik({
    initialValues,
    validationSchema: UserSchema,
    onSubmit,
  });
  async function handleLoggedingUser(newUserAccount: any) {
    try {
      const response = await loginUser(newUserAccount).unwrap();
      console.log(response);
      showSnackbar(response.message, "success");
    } catch (error: any) {
      showSnackbar(error?.data?.message, "error");
    }
  }
  async function onSubmit() {
    handleLoggedingUser(values);
    // resetForm();
  }
  const { values, handleChange, handleSubmit, errors, touched, resetForm } =
    formik;

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="max-w-sm mx-auto"
    >
      <Input
        type="email"
        label="Email"
        id="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        touched={touched.email}
      />
      <Input
        type="password"
        label="Mot de passe"
        id="password"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
        touched={touched.password}
      />
      {responseLoginUser?.isLoading ? (
        <ButtonLoading />
      ) : (
        <Button type="submit" size={"sm"} className="bg-blue-600">
          Se connecter
        </Button>
      )}
    </form>
  );
}
