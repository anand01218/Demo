import Image from "next/image";
import Link from "next/link";
import React from "react";
import logoSvg from "../../../../public/assets/images/logo/logo.svg";
import logoWhite from "../../../../public/assets/images/logo/logo-white.svg";
import SignInBasicForm from "@/form/auth/SignIn/basic-form";

const SignInBasicMain = () => {
  return (
    <>
      <div
        className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 relative"
        style={{
          backgroundImage: "url('/assets/images/bg/LoginCover2.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: " center -230px",
          backgroundSize: "cover",
        }}
      >
        {/* Background overlay for better readability */}
        <div className="absolute inset-0 bg-gray-300/80 dark:bg-gray-900/80" />

        <div className="w-full max-w-md relative z-10">
          <div className="bg-gray-50 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mb-6">
                <Link
                  href="#"
                  className="authentication-logo logo-black inline-block"
                >
                  <Image className="h-15 w-auto" src={logoSvg} alt="logo" />
                </Link>
                <Link
                  href="#"
                  className="authentication-logo logo-white inline-block"
                >
                  <Image className="h-15 w-auto" src={logoWhite} alt="logo" />
                </Link>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome Back
              </h1>
            </div>

            {/* Form */}
            <div className="mb-6">
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
