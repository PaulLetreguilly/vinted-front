import {
  useStripe,
  useElements,
  CardElement,
  // Elements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ token, id, price, name }) => {
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

      const response = await axios.post(
        "https://my-vinted-api-paul.herokuapp.com/payment",
        {
          token: stripeResponse.token.id,
          amount: price + 15,
          name: name,
          id: id,
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        setValid("Paiement validé !");
      }
    } catch (error) {
      console.log(error.response.data);
      console.log(error.message);
    }
  };

  return (
    <section className="pay-body">
      <form onSubmit={handleSubmit} className="pay-form">
        <div>
          <div style={{ color: "lightgray" }}>Résumé de la commande</div>
          <p>
            <span>Commande</span>
            <span>{price} €</span>
          </p>
          <p>
            <span>Frais de protection acheteurs </span>
            <span>5 €</span>
          </p>
          <p>
            <span>Frais de port </span>
            <span>10 €</span>
          </p>
        </div>
        <div>
          <p>
            <span className="pay-span">Total</span>
            <span className="pay-span">{price + 15} €</span>
          </p>
          <p className="not-this-one">
            Il ne vous reste plus qu'une étape pour vous offrir{" "}
            <span className="pay-span">{name}</span>. Vous allez payer{" "}
            <span className="pay-span">{price + 15}</span> € (frais de
            protection et frais de port inclus)
          </p>
        </div>
        <div className="pay-last-segment">
          <CardElement
            style={{ border: "1px solid lightgray" }}
            className="card-element"
          />
          <input type="submit" value="Pay" />
          <span className="validation" style={{ color: "green" }}>
            {valid}
          </span>
        </div>
      </form>
    </section>
  );
};

export default CheckoutForm;
