import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

const Offer = () => {
  //   console.log(offer.product_details);

  //   const responsive = {
  //     superLargeDesktop: {
  //       // the naming can be any, depends on you.
  //       breakpoint: { max: 4000, min: 3000 },
  //       items: 5,
  //     },
  //     desktop: {
  //       breakpoint: { max: 3000, min: 1024 },
  //       items: 3,
  //     },
  //     tablet: {
  //       breakpoint: { max: 1024, min: 464 },
  //       items: 2,
  //     },
  //     mobile: {
  //       breakpoint: { max: 464, min: 0 },
  //       items: 1,
  //     },
  //   };

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id} `
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
  //   console.log(data.offers, id);
  //   const offer = data.offers.find((elem) => elem._id === id);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <section className="contain-offer">
      {/* <Carousel responsive={responsive}>
        {console.log(offer.product_pictures[0].secure_url)}
        {offer.product_pictures.map((item, index) => {
          return (
            <div>
              <img key={index} src={item.secure_url} alt="" />
            </div>
          );
        })}
      </Carousel> */}
      <img src={data.product_image.secure_url} alt="" />
      <div className="details">
        <div>
          <p className="info price">{data.product_price} €</p>
          <div className="info">
            {data.product_details.map((item, index) => {
              const tab = Object.keys(item);
              return (
                <div key={index} className="spans">
                  <span className="span1">{tab[0]}</span>
                  <span>{item[tab[0]]}</span>
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
      </div>
    </section>
  );
};

export default Offer;
