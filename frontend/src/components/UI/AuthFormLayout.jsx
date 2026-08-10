import React from "react";
import { Link } from "react-router-dom";
import AuthSidePanel from "./AuthSidePanel";

const AuthFormLayout = ({
  sidePanel,
  mobileTitle,
  mobileTagline,
  heading,
  subheading,
  onSubmit,
  children,
  footerText,
  footerLinkText,
  footerLinkTo,
}) => {
  return (
    <div className="min-h-screen flex bg-primary">
      <AuthSidePanel {...sidePanel} />

      <div className="flex-1 lg:ml-[42%] flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md reveal reveal-in">
          <div className="lg:hidden mb-10 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-secondary uppercase">
              {mobileTitle}
            </h1>
            <p className="mt-1 font-mono text-[10px] tracking-[0.3em] uppercase text-secondary/40">
              {mobileTagline}
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
              {heading}
            </h2>
            <p className="mt-1 text-sm text-secondary/50">{subheading}</p>

            <form
              onSubmit={onSubmit}
              className="mt-7 flex flex-col gap-5"
              noValidate
            >
              {children}
            </form>
          </div>

          <p className="mt-8 text-center font-mono text-[10px] tracking-[0.2em] uppercase text-secondary/30">
            {footerText}{" "}
            <Link
              to={footerLinkTo}
              className="text-secondary/60 hover:text-secondary/90 underline underline-offset-2"
            >
              {footerLinkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthFormLayout;
