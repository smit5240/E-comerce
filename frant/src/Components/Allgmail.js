import React, { useEffect, useState } from "react";
import axios from "axios";
import Loding from "./Loding";
import { useNavigate } from "react-router-dom";

export default function Allgmail() {
  const [allgmail, setAllgmail] = useState([]);
  const [lode, setLode] = useState(true);
  const [selectname, setSelectname] = useState();
  // const [selectid, setSelectid] = useState();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/");
    } else {
      try {
        axios
          .get("http://localhost:4200/gall")
          .then((res) => {
            setLode(false);
            setAllgmail(res.data.message);
          })
          .catch((error) => {
            console.log("error==> ", error);
          });
      } catch (error) {
        window.alert("ERROR=>", error);
      }
    }
  }, []);
  const selectitem = async (id) => {
    await axios
      .get(`http://localhost:4200/glogin/${id}`)
      .then((res) => {
        let token = res.data.message;
        localStorage.setItem("token", token);
        navigate("/home");
      })
      .catch((err) => {
        console.log("error =>", err);
      });
  };
  return (
    <div>
      <div className="container">
        <div className="lodeh">
          <div className="d-flex justify-content-center align-item-center mb-5">
            {lode === true && <Loding />}
          </div>
        </div>
        {lode === false ? (
          <div className="top d-flex justify-content-center mb-5">
            <img src="google.png " className="google_title" alt="" />
          </div>
        ) : (
          ""
        )}
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="row justify-content-center">
              {allgmail &&
                allgmail.map((item, index) => (
                  <div
                    className={` col-7 card w-45 mb-3 gcard gbg`}
                    key={index}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => setSelectname(item.name)}
                  >
                    <div className="card-body p-2 ">
                      <span className="card-title   m-0">
                        {" "}
                        <img
                          src="google_logo.png "
                          className="logo mt-2"
                          alt=""
                        />
                        <h5 className=" gtitle "> {item.name}</h5>
                      </span>
                      <p className="card-text  google_mail">{item.email}</p>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-dark text-white">
                          <div className="modal-body">
                            {" "}
                            Continue with {selectname}
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn text-primary"
                              data-bs-dismiss="modal"
                              onClick={() => selectitem(item._id)}
                            >
                              Containue
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {lode === false ? (
          <div className="d-flex justify-content-center mt-5">
            <a href="/googleform" className=" text-primary">
              Add Mail
            </a>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
