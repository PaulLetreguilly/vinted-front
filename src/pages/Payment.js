import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const Payment = ({ token, setModallog }) => {
  const [data, setData] = useState();

  const { id } = useParams();
  // console.log(id);

  if (!token) {
    setModallog(true);
  } else {
    setModallog(false);
  }
  const stripePromise = loadStripe(
    "pk_test_51JwPrKJAkfui3UATJaDFI0rmKh2xhnbo9dy7jc5TEclFR4DzM3dvywl0Z0bw4Aa2FLtzA8dY5wy8w9l4nGGVM2Np00scsFMxmb"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
          // `http://localhost:4000/offer/${id}`
          `https://my-vinted-api-paul.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
    // console.log(data._id);
  }, [id]);

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          token={token}
          price={data.product_price}
          name={data.product_name}
          id={data._id}
        />
      </Elements>
    </div>
  );
};

export default Payment;
