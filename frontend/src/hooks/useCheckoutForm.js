import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { DELIVERY_METHODS } from "../pages/Checkout/constant";
import { parsePrice } from "../pages/Checkout/utils";

export const useCheckoutForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { items, clearCart, removeItems } = useCart();
  const { showToast } = useToast();

  const selectedIds = location.state?.selectedIds;
  const checkoutLines = useMemo(() => {
    if (!selectedIds || selectedIds.length === 0) return items;
    const idSet = new Set(selectedIds);
    return items.filter((line) => idSet.has(line.id));
  }, [items, selectedIds]);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    country: "NG",
    state: "",
    stateName: "",
  });
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [placing, setPlacing] = useState(false);

  const updateField = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const setCountry = (isoCode) => {
    setForm((prev) => ({
      ...prev,
      country: isoCode,
      state: "",
      stateName: "",
    }));
  };

  const setState = (isoCode, name) => {
    setForm((prev) => ({ ...prev, state: isoCode, stateName: name }));
  };

  const subtotal = checkoutLines.reduce(
    (sum, line) => sum + parsePrice(line.product.price) * line.qty,
    0,
  );
  const selectedDelivery = DELIVERY_METHODS.find(
    (d) => d.id === deliveryMethod,
  );
  const deliveryFee = checkoutLines.length > 0 ? selectedDelivery.price : 0;
  const total = subtotal + deliveryFee;

  const isAddressValid =
    form.fullName.trim() &&
    form.phone.trim().length >= 10 &&
    form.address.trim() &&
    form.city.trim() &&
    form.country &&
    form.state;

  const canPlaceOrder =
    checkoutLines.length > 0 && isAddressValid && paymentMethod && !placing;

  const handlePlaceOrder = async () => {
    if (!canPlaceOrder) return;
    setPlacing(true);

    await new Promise((resolve) => setTimeout(resolve, 900));

    const idsToRemove = checkoutLines.map((line) => line.id);
    if (idsToRemove.length === items.length) {
      clearCart();
    } else {
      removeItems(idsToRemove);
    }

    showToast("Order placed successfully", { type: "success" });
    setPlacing(false);
    navigate("/shop");
  };

  return {
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
  };
};
