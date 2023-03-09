import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { allactioncreater } from "../Action/Allaction";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import Loding from "./Loding";

export default function Home() {
  const [lode, setLode] = useState(true);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const { addTocart } = bindActionCreators(allactioncreater, dispatch);
  const { Cart } = useSelector((state) => state);

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      axios
        .get("http://localhost:4200/allproduct")
        .then((res) => {
          let temp = [];
          res.data.message.map((item) => {
            temp.push({ ...item, addTocart: 1 });
          });
          setLode(false);
          setProduct(temp);
        })
        .catch((error) => {
          window.alert("error");
          console.log("error==>", error);
        });
    }
    if (Cart.cart.length <= 0) {
      let data = { name: "smit" };
      localStorage.setItem("404page", data);
    } else {
      localStorage.removeItem("404page");
    }
  }, []);
  const incerease = (addtocart, index) => {
    const temp = [];
    product.map((item, i) => {
      if (index === i) {
        temp.push({ ...item, addTocart: item.addTocart + 1 });
      } else {
        temp.push({ ...item });
      }
    });
    setProduct(temp);
  };

  const decrease = (addTocart, index) => {
    let temp = [];
    product.map((item, i) => {
      if (item.addTocart > 1) {
        if (i === index) {
          temp.push({ ...item, addTocart: item.addTocart - 1 });
        } else {
          temp.push({ ...item });
        }
      } else {
        temp.push({ ...item, addTocart: (item.addTocart = 1) });
      }
    });
    setProduct(temp);
  };

  const buyproductbtn = async (id, cart, index) => {
    await axios
      .get(`http://localhost:4200/singleproduct/${id}`)
      .then((res) => {
        let data = { ...res.data.message, cart };
        addTocart(data);
        navigate("/order");
      })
      .catch((err) => {
        console.log("err==>", err);
      });
  };

  return (
    <div>
      <div className="lodeh black">
        <div className="d-flex justify-content-center align-item-center mb-5">
          {lode === true && <Loding />}
        </div>
      </div>
      {lode === false ? (
        <div>
          <Link className="rdb" to="/order">
            <i className="fa-solid fa-cart-shopping "></i>
            <p className="no">{Cart.cartLength} </p>
          </Link>
        </div>
      ) : (
        ""
      )}
      {lode === false ? (
        <div>
          <h2 className="d-flex justify-content-center top mb-5">
            Online Shoping
          </h2>
        </div>
      ) : (
        ""
      )}
      {lode === false ? (
        <div className="container">
          <div className="row justify-content-center ">
            {product &&
              product.map((item, index) => (
                <div
                  className="col-10 col-sm-6  col-md-4 col-lg-3 d-flex justify-content-center bg  my-2 "
                  key={item._id}
                >
                  <div>
                    <img className="mt-3 bigimg" alt="" src={item.img} />
                    <p className="mb-1 d-flex justify-content-center ">
                      Name : {item.name.slice(0, 19)}
                    </p>
                    <p className="d-flex justify-content-center">
                      price : <strong> $ {item.price}</strong>
                    </p>
                    <div className=" d-flex justify-content-center mb-3">
                      <div className="row pagination ">
                        <div
                          className="col-4 sideR"
                          onClick={() => decrease(item.addTocart, index)}
                        >
                          <span>-</span>
                        </div>
                        <div className="col-4">{item.addTocart} </div>
                        <div
                          className="col-4 sideL"
                          onClick={() => incerease(item.addTocart, index)}
                        >
                          <span>+</span>
                        </div>
                      </div>
                    </div>
                    <div className=" d-flex justify-content-center mb-3">
                      <button
                        className="btn btn-primary"
                        type=""
                        onClick={() => {
                          buyproductbtn(item._id, item.addTocart, index);
                        }}
                      >
                        Add To cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
