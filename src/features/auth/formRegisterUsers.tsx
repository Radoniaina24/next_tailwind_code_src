"use client";
import { Button } from "flowbite-react";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import User from "@/interface/user";
import Input from "@/components/form/Input";
import { useAddUserMutation } from "@/lib/api/authApi";
import ButtonLoading from "@/components/button/ButtonLoading";
import { useSnackbar } from "@/lib/context/SnackbarContext";
const UserSchema = yup.object({
  fullname: yup.string().required("Ce nom est indispensable"),
  email: yup
    .string()
    .email("Assurez-vous que le courriel est valide.")
    .required("Ce courriel est requis."),
  password: yup.string().required("Il est nécessaire d'avoir ce mot de passe"),
});
const initialValues: Omit<User, "_id"> = {
  fullname: "",
  email: "",
  password: "",
};

export default function FormRegisterUsers() {
  const { showSnackbar } = useSnackbar();
  const [addUser, responseAddUser] = useAddUserMutation();
  async function handleRegisterUser(newUserAccount: any) {
    try {
      await addUser(newUserAccount).unwrap();
      showSnackbar("User created successfully", "success"); // message, type(error, success)
    } catch (error: any) {
      showSnackbar(error?.data?.message, "error");
    }
  }
  const formik = useFormik({
    initialValues,
    validationSchema: UserSchema,
    onSubmit,
  });
  async function onSubmit() {
    handleRegisterUser(values);
    resetForm();
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
        type="text"
        label="Nom"
        id="fullname"
        value={values.fullname}
        onChange={handleChange}
        error={errors.fullname}
        touched={touched.fullname}
      />
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
      {responseAddUser?.isLoading ? (
        <ButtonLoading />
      ) : (
        <Button type="submit" size={"sm"} className="bg-blue-600">
          S'inscrire
        </Button>
      )}
    </form>
  );
}
