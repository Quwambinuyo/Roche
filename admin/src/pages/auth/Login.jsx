import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";

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

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      console.log("login submit", values);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-primary">
      <div className="hidden lg:flex lg:w-[42%] relative bg-secondary text-primary flex-col justify-between overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 1px, transparent 14px)",
          }}
        />

        <div className="relative px-12 pt-14">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary/50">
            Staff Portal
          </p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight uppercase">
            BODESTRT
          </h1>
          <p className="mt-3 font-mono text-xs tracking-widest uppercase text-primary/50">
            Ops Console
          </p>
        </div>

        <div className="relative px-12 pb-14">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary/40 mb-3">
            Manifest
          </p>
          <ul className="space-y-2">
            {MODULES.map((mod, i) => (
              <li
                key={mod}
                className="flex items-center gap-3 font-mono text-sm text-primary/70"
              >
                <span className="text-primary/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 border-b border-dotted border-primary/15 pb-2">
                  {mod}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm reveal reveal-in">
          <div className="lg:hidden mb-10 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-secondary uppercase">
              BODESTRT
            </h1>
            <p className="mt-1 font-mono text-[10px] tracking-[0.3em] uppercase text-secondary/40">
              Ops Console
            </p>
          </div>

          <div className="flex flex-col items-center mb-8">
            <div className="w-3 h-3 rounded-full border-2 border-secondary/30" />
            <div className="w-px h-5 border-l border-dashed border-secondary/25" />
          </div>

          <div
            className="relative bg-primary border border-secondary/15 px-8 pt-8 pb-9 shadow-sm"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)",
            }}
          >
            <h2 className="text-xl font-bold text-secondary tracking-tight">
              Sign in
            </h2>
            <p className="mt-1 text-sm text-secondary/50">
              Enter your credentials to access the console.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-7 flex flex-col gap-5"
              noValidate
            >
              <div>
                <label
                  htmlFor="email"
                  className="block font-mono text-[10px] tracking-[0.2em] uppercase text-secondary/50 mb-2"
                >
                  Email
                </label>
                <div className="flex items-center gap-2.5 border-b border-secondary/20 focus-within:border-tertiary-600 transition-colors duration-200 pb-2.5">
                  <FiMail size={16} className="text-secondary/40 shrink-0" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@bodestrt.com"
                    className="w-full bg-transparent outline-none text-sm text-secondary placeholder:text-secondary/30"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block font-mono text-[10px] tracking-[0.2em] uppercase text-secondary/50"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="font-mono text-[10px] tracking-widest uppercase text-tertiary-600 hover:text-secondary transition-colors duration-200"
                  >
                    Forgot?
                  </a>
                </div>
                <div className="flex items-center gap-2.5 border-b border-secondary/20 focus-within:border-tertiary-600 transition-colors duration-200 pb-2.5">
                  <FiLock size={16} className="text-secondary/40 shrink-0" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="w-full bg-transparent outline-none text-sm text-secondary placeholder:text-secondary/30"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="text-secondary/40 hover:text-secondary transition-colors duration-200 shrink-0"
                  >
                    {showPassword ? (
                      <FiEyeOff size={16} />
                    ) : (
                      <FiEye size={16} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full flex items-center justify-center gap-2 bg-secondary text-primary text-sm font-semibold py-3.5 hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
                {!isSubmitting && <FiArrowRight size={15} />}
              </button>
            </form>
          </div>

          <p className="mt-8 text-center font-mono text-[10px] tracking-[0.2em] uppercase text-secondary/30">
            Staff access only
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
