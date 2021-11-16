import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const Payment = ({ token, setModallog }) => {
  if (!token) {
    setModallog(true);
  } else {
    setModallog(false);
  }
  const stripePromise = loadStripe(
    "pk_test_51JwPrKJAkfui3UATJaDFI0rmKh2xhnbo9dy7jc5TEclFR4DzM3dvywl0Z0bw4Aa2FLtzA8dY5wy8w9l4nGGVM2Np00scsFMxmb"
  );

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm token={token} />
      </Elements>
    </div>
  );
};

export default Payment;
