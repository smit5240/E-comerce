import React, { useState } from "react";
import { TextField } from "./TextField";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loding from "./Loding";

export default function Signup() {
  const [lode, setLode] = useState(false);
  const navigate = useNavigate();
  const validate = Yup.object({
    name: Yup.string()
      .min(2, "Must be 2 character or upp")
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    contact: Yup.string()
      .min(10, "Must be 10 character add")
      .max(10, "Must be 10 character add")
      .required("Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(3, "Password must be at least 3 charaters")
      .required("Password is required"),
    cpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });
  const Rclick = async (value) => {
    setLode(true);
    await axios
      .post("http://localhost:4200/register", value)
      .then((res) => {
        setLode(false);
        window.alert(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        setLode(false);
        console.log("error===> ", err);
        window.alert("User Allready Registed", err);
      });
  };
  return (
    <Formik
      initialValues={{
        name: "",
        contact: "",
        email: "",
        password: "",
        cpassword: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        Rclick(values);
      }}
    >
      {(formik) => (
        <div>
          <div className="lodeh">
            <div className="d-flex justify-content-center align-item-center mb-5">
              {lode === true && <Loding />}
            </div>
          </div>
          {lode === false ? (
            <section className="top">
              <div className="container">
                <div>
                  <div className="row">
                    <div className="col d-flex justify-content-center item-center pt-4 mb-4">
                      <div className="login-title ">
                        <h2>Sign-Up</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row  justify-content-center  pb-5">
                  <div className="col-sm-10 col-md-9 col-xl-9">
                    <Form>
                      <div className="mb-3">
                        <TextField lable="Full Name" name="name" type="text" />
                      </div>
                      <div className="mb-3">
                        <TextField
                          lable="Contact"
                          name="contact"
                          type="number"
                        />
                      </div>
                      <div className="mb-3">
                        <TextField lable="Email" name="email" type="email" />
                      </div>
                      <div className="mb-3">
                        <TextField
                          lable="Password"
                          name="password"
                          type="password"
                        />
                      </div>
                      <div className="mb-3">
                        <TextField
                          lable="Confirm Password"
                          name="cpassword"
                          type="password"
                        />
                      </div>
                      <button className="btn btn-dark mt-3 me-3" type="submit">
                        Register
                      </button>
                    </Form>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            ""
          )}
        </div>
      )}
    </Formik>
  );
}
