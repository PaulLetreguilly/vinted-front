import { useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Offer = ({ data }) => {
  const { id } = useParams();
  const offer = data.offers.find((elem) => elem._id === id);
  //   console.log(offer.product_details);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
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
      <img src={offer.product_image.secure_url} alt="" />
      <div className="details">
        <div>
          <p className="info price">{offer.product_price} €</p>
          <div className="info">
            {offer.product_details.map((item, index) => {
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
          <p className="info">{offer.product_name}</p>
          <p className="info">{offer.product_description}</p>
          <button>acheter</button>
        </div>
      </div>
    </section>
  );
};

export default Offer;
