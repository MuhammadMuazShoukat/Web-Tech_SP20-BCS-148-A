import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "../context/ContextReducer";

export default function Card({ data }) {
  let dispatch = useDispatchCart();
  let options = data.options[0];
  const priceRef = useRef();
  let cart = useCart();
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const addToCartHandler = async () => {
    await dispatch({
      type: "ADD",
      payload: {
        id: data._id,
        name: data.name,
        price: finalPrice,
        qty: qty,
        size: size,
      },
    });
    await console.log(cart);
  };
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "420px" }}
        >
          <img
            src={data.img}
            style={{ height: "180px", objectFit: "fill" }}
            className="card-img-top"
            alt="..."
          />

          <div className="card-body">
            <h5 className="card-title">{data.name}</h5>

            <div className="container w-100">
              <select
                className="m-2 h-100 w-100 bg-primary"
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select
                className="m-2  h-100 w-100 bg-primary rounded"
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
              <div className="d-inline h-100 fs-5">
                <label> Price: </label>
                {"    "}
                {finalPrice} $
              </div>
              <hr />
              <button
                className="btn btn-primary justify-center ms-2"
                onClick={addToCartHandler}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
