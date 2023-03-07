import React, { useState } from "react";
import { TextField } from "./TextField";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loding from "./Loding";

export default function Googleform() {
  const navigate = useNavigate();

  const [lode, setLode] = useState(false);
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
  });
  const Rclick = async (value) => {
    setLode(true);
    await axios
      .post("http://localhost:4200/gregister", value)
      .then((res) => {
        if (res.data.message === "User Register SuccessFull") {
          setLode(false);
          navigate("/gotogoogle");
        }
      })
      .catch((err) => {
        console.log("error===> ", err);
        window.alert(err);
      });
  };
  return (
    <Formik
      initialValues={{
        name: "",
        contact: "",
        email: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        Rclick(values);
      }}
    >
      {(formik) => (
        <div>
          <section className="top">
            <div className="container">
              <div className="lodeh">
                <div className="d-flex justify-content-center align-item-center mb-5">
                  {lode === true && <Loding />}
                </div>
              </div>
              {lode === false ? (
                <div>
                  <div className="row">
                    <div className="col d-flex justify-content-center item-center pt-4">
                      <div className="d-flex justify-content-center">
                        {/* <h2>Create New G-mail</h2> */}
                        <img
                          src="google.png"
                          className="google_title1 "
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col d-flex justify-content-center item-center pt-2 mb-4">
                      <div className="d-flex justify-content-center">
                        <p className="create_new">Create new G-mail</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {lode === false ? (
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
                      <button className="btn btn-dark mt-3 me-3" type="submit">
                        Register
                      </button>
                    </Form>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </section>
        </div>
      )}
    </Formik>
  );
}
