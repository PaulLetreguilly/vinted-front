import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://my-vinted-api-paul.herokuapp.com/offer/${id} `
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  // console.log(data);
  let arr = [];
  if (data) {
    arr = Object.keys(data.product_details);
  }
  // arr.map((item, index)=>{
  //   return <div key={index}>
  //     <span>{item}</span><span>{data.product_details[item]}</span>
  //   </div>
  // })

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <section className="contain-offer">
      <img src={data.product_image.secure_url} alt="" />
      <div className="details">
        <div>
          <p className="info price">{data.product_price} €</p>
          <div className="info">
            {data.product_details &&
              arr.map((item, index) => {
                return (
                  <div key={index} className="spans">
                    <span className="span1">{item}</span>
                    <span>{data.product_details[item]}</span>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="infos">
          <p className="info">{data.product_name}</p>
          <p className="info">{data.product_description}</p>
          <button>acheter</button>
        </div>
        <button className="hide-it">acheter</button>
      </div>
    </section>
  );
};

export default Offer;
