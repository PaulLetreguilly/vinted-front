import {
  useStripe,
  useElements,
  CardElement,
  Elements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ token }) => {
  const [valid, setValid] = useState("");

  const stripe = useStripe();
  const element = useElements();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const cardElements = element.getElement(CardElement);

      const stripeResponse = await stripe.createToken(cardElements, {
        name: token,
      });

      const response = await axios.post("http://localhost:4000/payment", {
        stripeToken: stripeResponse.token.id,
        productPrice: 20,
      });
      console.log(response.data);
      if (response.status === 200) {
        setValid("Paiement validé !");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="pay-body">
      <form onSubmit={handleSubmit} className="pay-form">
        <div>
          <div style={{ color: "lightgray" }}>Résumé de la commande</div>
          <p>Commande</p>
          <p>Frais de protection acheteurs</p>
          <p>Frais de port</p>
        </div>
        <div>
          <p>Total</p>
          <p>Il ne vous reste plus que ....</p>
        </div>
        <div>
          <CardElement style={{ border: "1px solid lightgray" }} />
          <input type="submit" value="Pay" />
          <span style={{ color: "green" }}>{valid}</span>
        </div>
      </form>
    </section>
  );
};

export default CheckoutForm;
