import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";
import AuthFormLayout from "../../components/UI/AuthFormLayout";
import AuthInput from "../../components/UI/AuthInput";
import AuthSubmitButton from "../../components/UI/AuthSubmitButton";
import PasswordToggleButton from "../../components/UI/PasswordToggleButton";

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    phone: z.string().optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const PERKS = [
  "Order Tracking",
  "Faster Checkout",
  "Wishlists",
  "Early Access",
];

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const togglePasswordVisibility = () => setShowPassword((v) => !v);

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      console.log("register submit", values);
      navigate("/login");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthFormLayout
      sidePanel={{
        eyebrow: "ZF Fashion",
        title: "ZF",
        tagline: "Create Account",
        listLabel: "Perks",
        items: PERKS,
      }}
      mobileTitle="Bode s.t.r.t"
      mobileTagline="Create Account"
      heading="Sign up"
      subheading="Create an account to start shopping."
      onSubmit={handleSubmit(onSubmit)}
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkTo="/login"
    >
      <AuthInput
        id="name"
        label="Full Name"
        icon={FiUser}
        type="text"
        autoComplete="name"
        placeholder="John Doe"
        registration={register("name")}
        error={errors.name}
      />

      <AuthInput
        id="email"
        label="Email"
        icon={FiMail}
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        registration={register("email")}
        error={errors.email}
      />

      <AuthInput
        id="phone"
        label="Phone"
        labelExtra={<span className="text-secondary/30">(optional)</span>}
        icon={FiPhone}
        type="tel"
        autoComplete="tel"
        placeholder="+234 800 000 0000"
        registration={register("phone")}
      />

      <AuthInput
        id="password"
        label="Password"
        icon={FiLock}
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        placeholder="At least 8 characters"
        registration={register("password")}
        error={errors.password}
        rightElement={
          <PasswordToggleButton
            visible={showPassword}
            onToggle={togglePasswordVisibility}
          />
        }
      />

      <AuthInput
        id="confirmPassword"
        label="Confirm Password"
        icon={FiLock}
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        placeholder="Re-enter your password"
        registration={register("confirmPassword")}
        error={errors.confirmPassword}
      />

      <AuthSubmitButton
        isSubmitting={isSubmitting}
        submittingText="Creating account..."
        idleText="Create Account"
      />
    </AuthFormLayout>
  );
};

export default Register;
