import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Productmanage() {
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  let token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:4200/allproduct")
        .then((res) => {
          setProduct(res.data.message);
        })
        .catch((error) => {
          window.alert(error);
        });
    }
  }, []);

  const Rclick = async (id) => {
    try {
      await axios
        .delete(`http://localhost:4200/deleteproduct/${id}`)
        .then((res) => {
          navigate("/manage");
          window.alert(res.data.message);
        })
        .catch((error) => {
          window.alert(error);
        });
      await axios
        .get("http://localhost:4200/allproduct")
        .then((res) => {
          setProduct(res.data.message);
        })
        .catch((error) => {
          window.alert(error);
        });
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  };
  return (
    <div>
      <div>
        <h2 className="d-flex justify-content-center top mb-5">
          Handling Product side
        </h2>
      </div>
      <div className="container">
        <div className="row">
          {product &&
            product.map((item) => (
              <div className="col-sm-12 col-md-4 col-lg-3 d-flex justify-content-center bg  my-2 mx-2 mt-3 manage ms-3">
                <div key={item._id}>
                  <img className="mt-3 bigimg" src={item.img} alt="" />
                  <p className="mb-1 d-flex justify-content-center ">
                    Name :{item.name}
                  </p>
                  <p className="d-flex justify-content-center">
                    price : <strong> $ {item.price} </strong>
                  </p>
                  <div className=" d-flex justify-content-center">
                    <button
                      className="btn btn-danger mb-3"
                      onClick={() => {
                        Rclick(item._id);
                      }}
                    >
                      Delete Product
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
