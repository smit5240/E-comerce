import React, { useEffect } from "react";
import { TextField } from "./TextField";
import * as yup from "yup";
import { Formik, Form } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const tokens = localStorage.getItem("token");
  useEffect(() => {
    if (tokens) {
      navigate("/home");
    }
  }, []);
  const Rclick = async (value) => {
    await axios
      .post("http://localhost:4200/login", value)
      .then((res) => {
        let token = res.data.token;
        localStorage.setItem("token", token);
        if (token) {
          navigate("/home");
        }
        window.alert(res.data.message);
      })
      .catch((err) => {
        console.log("error===> ", err);
        window.alert("User Allready Registed", err);
      });
  };

  const validation = yup.object({
    email: yup
      .string()
      .email("email is Invlaide")
      .required("Email is Required"),
    password: yup.string().min(4, "Must be 4 character add "),
  });
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validation}
      onSubmit={(values) => {
        Rclick(values);
      }}
    >
      {(formik) => (
        <div>
          <div className="mt-5 ">
            <div className="container  top">
              <div className="row justify-content-center">
                <div className=" col-12 d-flex justify-content-center item-center pt-4">
                  <h2>Sign-in</h2>
                </div>
                <div className="col-12">
                  <div className="row justify-content-center pb-5 mt-5">
                    <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6">
                      <Form>
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
                        <button className=" sbtn" type="submit">
                          Submit
                        </button>
                      </Form>
                    </div>
                  </div>
                </div>

                <div className="col-12 d-flex justify-content-center mt-3">
                  Don't have an Account ?{" "}
                  <a className="sgc ms-3" href="/signup">
                    {" "}
                    Sign-Up
                  </a>
                </div>
                <div className=" col-12 d-flex justify-content-center mt-4 mb-5">
                  <a className="gca m-2 " href="/gotogoogle">
                    <i className="fa-brands fa-google me-2 "></i>Continue With
                    Google
                  </a>
                  <a className="fca m-2 fca" href="/gotofacebook">
                    {" "}
                    <i className="fa-brands fa-facebook me-2"></i>Continue With
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}
