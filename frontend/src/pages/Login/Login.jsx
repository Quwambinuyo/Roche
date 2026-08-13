import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FiMail, FiLock } from "react-icons/fi";
import AuthFormLayout from "../../components/UI/AuthFormLayout";
import AuthInput from "../../components/UI/AuthInput";
import AuthSubmitButton from "../../components/UI/AuthSubmitButton";
import PasswordToggleButton from "../../components/UI/PasswordToggleButton";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Passcode is required"),
});

const MODULES = ["Products", "Bundles", "Orders", "Customers"];

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const togglePasswordVisibility = () => setShowPassword((v) => !v);

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      console.log("login submit", values);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthFormLayout
      sidePanel={{
        eyebrow: "Keep Going",
        title: "ZFZ",
        tagline: "Login Console",
        listLabel: "Manifest",
        items: MODULES,
      }}
      mobileTitle="ZFZ"
      mobileTagline="Login Console"
      heading="Sign in"
      subheading="Enter your credentials to access the console."
      onSubmit={handleSubmit(onSubmit)}
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkTo="/register"
    >
      <AuthInput
        id="email"
        label="Email"
        icon={FiMail}
        type="email"
        autoComplete="email"
        placeholder="you@ZFZ.com"
        registration={register("email")}
        error={errors.email}
      />

      <AuthInput
        id="password"
        label="Password"
        labelExtra={
          <a
            href="#"
            className="font-mono text-[10px] tracking-widest uppercase text-tertiary-600 hover:text-secondary transition-colors duration-200"
          >
            Forgot?
          </a>
        }
        icon={FiLock}
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        placeholder="••••••••"
        registration={register("password")}
        error={errors.password}
        rightElement={
          <PasswordToggleButton
            visible={showPassword}
            onToggle={togglePasswordVisibility}
          />
        }
      />

      <AuthSubmitButton
        isSubmitting={isSubmitting}
        submittingText="Signing in..."
        idleText="Sign in"
      />
    </AuthFormLayout>
  );
};

export default Login;
