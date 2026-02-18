import React, { useRef, useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "./Layout/MetaData";
import { useNavigate } from "react-router-dom";
import Checkoutstep from "./Checkoutstep";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import baseUrl from "../baseUrl";
import { createOrder, clearErrors } from "../actions/orderAction";

function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const payBtn = useRef(null);

  const { user } = useSelector((state) => state.user);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const paymentData = {
    amount: Math.round(orderInfo.total * 100),
  };

  const order = {
    orderItems: cartItems,
    shippingInfo,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.total,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/payment/process`,
        paymentData,
        { withCredentials: true }
      );

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          navigate("/success");
        } else {
          alert.error("Payment failed");
        }
      }
    } catch (err) {
      payBtn.current.disabled = false;
      alert.error(err.response?.data?.message || "Payment error");
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  return (
    <>
      <MetaData title="Payment" />
      <Checkoutstep activeStep={2} />

      <div className="max-w-md mx-auto m-20 p-10 bg-white shadow-lg rounded">
        <form onSubmit={submitHandler}>
          <h1 className="text-center text-xl font-semibold mb-6">
            Card Details
          </h1>

          <div className="mb-4">
            <CardNumberElement className="p-2 border rounded w-full" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <CardExpiryElement className="p-2 border rounded" />
            <CardCvcElement className="p-2 border rounded" />
          </div>

          <input
            type="submit"
            value={`Pay ₹${orderInfo.total}`}
            ref={payBtn}
            className="w-full bg-purple-700 text-white py-2 rounded cursor-pointer"
          />
        </form>
      </div>
    </>
  );
}

export default Payment;
