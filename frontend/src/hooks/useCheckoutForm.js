import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { DELIVERY_METHODS } from "../pages/Checkout/constant";
import { parsePrice } from "../pages/Checkout/utils";

export const useCheckoutForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { items, removeItems } = useCart();
  const { showToast } = useToast();

  const selectedIds = location.state?.selectedIds;

  const checkoutLines = useMemo(() => {
    if (!selectedIds?.length) return items;
    const idSet = new Set(selectedIds);
    return items.filter((line) => idSet.has(line.id));
  }, [items, selectedIds]);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    country: "NG",
    countryName: "Nigeria",
    state: "",
    stateName: "",
  });

  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [placing, setPlacing] = useState(false);

  const updateField = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const setCountry = (isoCode, name) => {
    setForm((prev) => ({
      ...prev,
      country: isoCode || "",
      countryName: name || isoCode || "",
      state: "",
      stateName: "",
    }));
  };

  const setState = (isoCode, name) => {
    setForm((prev) => ({
      ...prev,
      state: isoCode || name || "",
      stateName: name || isoCode || "",
    }));
  };

  const subtotal = checkoutLines.reduce(
    (sum, line) => sum + parsePrice(line.product.price) * line.qty,
    0,
  );

  const selectedDelivery = DELIVERY_METHODS.find(
    (d) => d.id === deliveryMethod,
  );
  const deliveryFee =
    checkoutLines.length > 0 ? (selectedDelivery?.price ?? 0) : 0;
  const total = subtotal + deliveryFee;

  const isAddressValid = Boolean(
    form.fullName.trim() &&
    form.phone.trim().length >= 10 &&
    form.address.trim() &&
    form.city.trim() &&
    (form.country || form.countryName) &&
    (form.state || form.stateName),
  );

  const canPlaceOrder =
    checkoutLines.length > 0 &&
    isAddressValid &&
    Boolean(paymentMethod) &&
    !placing;

  useEffect(() => {
    console.log("=== CHECKOUT FORM DEBUG ===", {
      form,
      paymentMethod,
      isAddressValid,
      canPlaceOrder,
      fieldChecks: {
        fullName: Boolean(form.fullName.trim()),
        phone: form.phone.trim().length >= 10,
        address: Boolean(form.address.trim()),
        city: Boolean(form.city.trim()),
        country: Boolean(form.country || form.countryName),
        state: Boolean(form.state || form.stateName),
      },
    });
  }, [form, paymentMethod, isAddressValid, canPlaceOrder]);

  const handlePlaceOrder = async () => {
    if (!canPlaceOrder) return;
    setPlacing(true);
    await new Promise((resolve) => setTimeout(resolve, 900));

    removeItems(checkoutLines.map((line) => line.id));

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
