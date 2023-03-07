import React, { useEffect, useState } from "react";
import axios from "axios";
import Loding from "./Loding";
import { useNavigate } from "react-router-dom";

export default function Facebook() {
  const [allfacebookuser, setAllfacebookuser] = useState([]);
  const [lode, setLode] = useState(true);
  const [selectstate, setSelecstate] = useState();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/");
    } else {
      try {
        axios
          .get("http://localhost:4200/fall")
          .then((res) => {
            setLode(false);
            setAllfacebookuser(res.data.message);
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
      .get(`http://localhost:4200/flogin/${id}`)
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
            <img src="facebook.png" className="facebook_title" alt="" />
          </div>
        ) : (
          ""
        )}
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="row justify-content-center">
              {allfacebookuser &&
                allfacebookuser.map((item, index) => (
                  <div
                    className={` col-7 card w-45 mb-3 gcard gbg`}
                    key={index}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => setSelecstate(item)}
                  >
                    <div className="card-body p-2 ">
                      <span className="card-title   m-0">
                        {" "}
                        <img src="fblogo.png" className="logo mt-3" alt="" />
                        <h5 className=" gtitle ms-5"> {item.name}</h5>
                      </span>
                      <p className="card-text ms-5">{item.email}</p>
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
                            Continue with {selectstate?.name}
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn text-primary"
                              data-bs-dismiss="modal"
                              onClick={() => selectitem(selectstate._id)}
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
            <a href="/facebookform" className=" text-primary">
              Create Facebook Account
            </a>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
