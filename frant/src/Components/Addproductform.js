import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loding from "./Loding";

export default function Addproductform() {
  const [lode, setLode] = useState(false);
  const [Data, setData] = useState({});
  const navigate = useNavigate();
  const handlechange = (e) => {
    e.preventDefault();
    setData({ ...Data, [e.target.name]: e.target.value });
  };
  let token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/addproduct");
    }
  }, []);
  const Rclick = (e) => {
    setLode(true);
    e.preventDefault();
    axios
      .post("http://localhost:4200/addproduct", Data)
      .then((res) => {
        setLode(false);
        navigate("/manage");
      })
      .catch((error) => {
        console.log(error);
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
          <div className="d-flex justify-content-center top">
            <h2>Add Product Details</h2>
          </div>
        ) : (
          ""
        )}
        {lode === false ? (
          <div className="row justify-content-center text-bg pt-3 pb-3 mt-5">
            <div className="col-sm-10">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Image Link :
                  </label>
                  <input
                    name="img"
                    value={Data.img}
                    onChange={handlechange}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Product Name :
                  </label>
                  <input
                    name="name"
                    value={Data.name}
                    onChange={handlechange}
                    type="Text"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Price :
                  </label>
                  <input
                    name="price"
                    value={Data.price}
                    onChange={handlechange}
                    type="number"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={Rclick}
                  >
                    Submit
                  </button>
                  {/* <button className="btn btn-danger ms-5" type="reset">
                  Reset
                </button> */}
                </div>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
