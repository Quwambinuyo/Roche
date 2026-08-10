import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { DELIVERY_METHODS } from "../pages/Checkout/constant";
import { parsePrice } from "../pages/Checkout/utils";

const parseVal = (v) =>
  v?.target?.value ??
  v?.value ??
  v?.label ??
  (typeof v === "object" ? "" : (v ?? ""));

export const useCheckoutForm = () => {
  const { state: locState } = useLocation();
  const navigate = useNavigate();
  const { items, removeItems } = useCart();
  const { showToast } = useToast();

  const checkoutLines = useMemo(() => {
    const selectedIds = locState?.selectedIds;
    if (!selectedIds?.length) return items;
    const idSet = new Set(selectedIds);
    return items.filter((line) => idSet.has(line.id));
  }, [items, locState]);

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

  // console.log(form);

  const updateField = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: parseVal(e) }));

  const setLocationField = (type, val1, val2) => {
    const code = parseVal(val1.value ?? val1.isoCode ?? val1);
    const name = parseVal(val1.label ?? val1.name ?? val2) || code;

    setForm((prev) =>
      type === "country"
        ? {
            ...prev,
            country: code || "NG",
            countryName: name || "Nigeria",
            state: "",
            stateName: "",
          }
        : { ...prev, state: code || name, stateName: name || code },
    );
  };

  const subtotal = useMemo(
    () =>
      checkoutLines.reduce(
        (sum, l) => sum + parsePrice(l.product.price) * l.qty,
        0,
      ),
    [checkoutLines],
  );

  const deliveryFee = checkoutLines.length
    ? (DELIVERY_METHODS.find((d) => d.id === deliveryMethod)?.price ?? 0)
    : 0;

  const total = subtotal + deliveryFee;
  const digitsOnly = form.phone.replace(/\D/g, "");

  const isAddressValid = Boolean(
    form.fullName.trim() &&
    (digitsOnly.length >= 10 || form.phone.trim().length >= 7) &&
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

  const handlePlaceOrder = async () => {
    if (!canPlaceOrder) return;
    setPlacing(true);
    await new Promise((res) => setTimeout(res, 900));

    removeItems(checkoutLines.map((l) => l.id));
    showToast("Order placed successfully", { type: "success" });
    setPlacing(false);
    navigate("/shop");
  };

  return {
    checkoutLines,
    form,
    updateField,
    setCountry: (v1, v2) => setLocationField("country", v1, v2),
    setState: (v1, v2) => setLocationField("state", v1, v2),
    deliveryMethod,
    setDeliveryMethod,
    paymentMethod,
    setPaymentMethod: (v) => setPaymentMethod(parseVal(v) || null),
    placing,
    subtotal,
    deliveryFee,
    total,
    isAddressValid,
    canPlaceOrder,
    handlePlaceOrder,
  };
};
