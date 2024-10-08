"use client";
import { Button } from "flowbite-react";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import User from "@/interface/user";
import Input from "@/components/form/Input";
const UserSchema = yup.object({
  name: yup.string().required("Ce nom est indispensable"),
  email: yup
    .string()
    .email("Assurez-vous que le courriel est valide.")
    .required("Ce courriel est requis."),
  password: yup.string().required("Il est nécessaire d'avoir ce mot de passe"),
});
const initialValues: Omit<User, "_id"> = {
  name: "",
  email: "",
  password: "",
};
export default function FormRegisterUsers() {
  const formik = useFormik({
    initialValues,
    validationSchema: UserSchema,
    onSubmit,
  });
  function onSubmit() {
    console.log(values);
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
        label="Name"
        id="name"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
        touched={touched.name}
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
      <Button type="submit" size={"sm"} className="bg-blue-600">
        Register account
      </Button>
    </form>
  );
}
