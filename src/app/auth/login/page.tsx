import Image from "next/image";
import Link from "next/link";
import React from "react";
import logoSvg from "../../../../public/assets/images/logo/logo.svg";
import logoWhite from "../../../../public/assets/images/logo/logo-white.svg";
import bgImage from "../../../../public/assets/images/bg/LoginCover2.png";
import SignInBasicForm from "@/form/auth/SignIn/basic-form";

const SignInBasicMain = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
        {/* Background Image using Next.js Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt="Login Background"
            fill
            className="object-cover"
            priority
            quality={100}
          />
        </div>

        {/* CSS Background as fallback */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/images/bg/LoginCover2.png')",
          }}
        />

        {/* Fallback gradient background */}
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-blue-50/30 via-white/30 to-indigo-50/30 dark:from-gray-900/30 dark:via-gray-800/30 dark:to-gray-900/30" />

        {/* Background overlay for better readability */}
        <div className="absolute inset-0 z-20 bg-white/15 dark:bg-gray-900/35 backdrop-blur-[1px]" />

        <div className="w-full max-w-md relative z-30">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-6 sm:p-8 mx-4">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="mb-4 sm:mb-6">
                <Link
                  href="#"
                  className="authentication-logo logo-black inline-block"
                >
                  <Image
                    className="max-w-full max-h-[80px] sm:max-h-[100px] w-auto h-auto object-contain"
                    src={logoSvg}
                    alt="logo"
                    width={200}
                    height={100}
                    priority
                  />
                </Link>
                <Link
                  href="#"
                  className="authentication-logo logo-white inline-block"
                >
                  <Image
                    className="max-w-full max-h-[80px] sm:max-h-[100px] w-auto h-auto object-contain"
                    src={logoWhite}
                    alt="logo"
                    width={200}
                    height={100}
                    priority
                  />
                </Link>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome Back
              </h1>
            </div>

            {/* Form */}
            <div className="mb-4 sm:mb-6">
              <SignInBasicForm />
            </div>

            {/* Sign up link */}
            {/* <div className="text-center mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup-basic"
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Create one now
                </Link>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInBasicMain;
