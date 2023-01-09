import React, { useEffect, useState } from "react";
import { isAccordionItemSelected } from "react-bootstrap/esm/AccordionContext";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let respone = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    respone = await respone.json();
    setFoodCat(respone[1]);
    setFoodItem(respone[0]);
  };

  useEffect(() => {
    loadData();
  }, []);

  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Carousel search={search} onSearch={searchHandler} />
      </div>
      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((catData) => {
            return (
              <div className="row my-3" key={catData._id}>
                <div
                  key={catData._id}
                  className="fs-3 m-3 "
                  style={{ color: "black" }}
                >
                  {catData.CategoryName}
                </div>
                <hr className="text-black"/>
                {foodItem.length > 0 ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === catData.CategoryName &&
                        item.name
                          .toLowerCase()
                          .includes(search.trim().toLocaleLowerCase())
                    )
                    .map((item) => {
                      return (
                        <div
                          key={item._id}
                          className="col-12 col-md-6 col-lg-4 col-xl-4"
                        >
                          <Card data={item} />
                        </div>
                      );
                    })
                ) : (
                  <div>No Such Data Found!!</div>
                )}
              </div>
            );
          })
        ) : (
          <div className="m-3 fs-2">NO Data Found</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
