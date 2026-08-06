import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Reveal from "../Landing/Reveal";
import { useCheckoutForm } from "../../hooks/useCheckoutForm";
import DeliveryAddressSection from "./components/DeliveryAddressSection";
import DeliveryMethodSection from "./components/DeliveryMethodSection";
import PaymentMethodSection from "./components/PaymentMethodSection";
import OrderSummaryCard from "./components/OrderSummaryCard";

const Checkout = () => {
  const {
    checkoutLines,
    form,
    updateField,
    setCountry,
    setState,
    deliveryMethod,
    setDeliveryMethod,
    paymentMethod,
    setPaymentMethod,
    placing,
    subtotal,
    deliveryFee,
    total,
    isAddressValid,
    canPlaceOrder,
    handlePlaceOrder,
  } = useCheckoutForm();

  if (checkoutLines.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-24">
        <p className="text-sm text-secondary/50">
          There's nothing to check out. Add items to your cart first.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-secondary hover:text-tertiary-600 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="">
      <Reveal className="mb-8">
        <Link
          to="/cart"
          className="inline-flex items-center gap-1 text-xs text-secondary/50 hover:text-secondary transition-colors mb-3"
        >
          <ArrowLeft size={13} />
          Back to cart
        </Link>
        <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase">
          Checkout
        </p>
        <h1 className="font-bold text-2xl md:text-3xl text-secondary mt-2">
          Complete Your Order
        </h1>
      </Reveal>

      <div className="grid md:grid-cols-[1fr_320px] gap-10 items-start">
        <div className="space-y-8">
          <DeliveryAddressSection
            form={form}
            updateField={updateField}
            onCountryChange={setCountry}
            onStateChange={setState}
          />
          <DeliveryMethodSection
            deliveryMethod={deliveryMethod}
            onChange={setDeliveryMethod}
          />
          <PaymentMethodSection
            paymentMethod={paymentMethod}
            onChange={setPaymentMethod}
          />
        </div>

        <OrderSummaryCard
          checkoutLines={checkoutLines}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          total={total}
          isAddressValid={isAddressValid}
          paymentMethod={paymentMethod}
          canPlaceOrder={canPlaceOrder}
          placing={placing}
          onPlaceOrder={handlePlaceOrder}
        />
      </div>
    </div>
  );
};

export default Checkout;
