"use client";
import ErrorMessage from "@/components/error-message/ErrorMessage";
import { ISignInForm } from "@/interface";
import { Checkbox, FormControlLabel } from "@mui/material";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/slices/authAction";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

const SignInBasicForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ISignInForm>();

  // Load saved credentials on component mount
  useEffect(() => {
    const savedCredentials = localStorage.getItem("rememberedCredentials");
    if (savedCredentials) {
      const { name, password } = JSON.parse(savedCredentials);
      setValue("name", name);
      setValue("password", password);
      setValue("rememberMe", true);
    }
  }, [setValue]);

  const onSubmit = async (data: ISignInForm) => {
    try {
      const result = await login({
        email: data.name,
        password: data.password,
      }).unwrap();

      // Handle remember me functionality
      if (data.rememberMe) {
        localStorage.setItem(
          "rememberedCredentials",
          JSON.stringify({
            name: data.name,
            password: data.password,
          })
        );
      } else {
        localStorage.removeItem("rememberedCredentials");
      }

      // Save user info to local storage
      localStorage.setItem("userInfo", JSON.stringify(result.user));

      // Server sets access_token cookie automatically, just store user info
      dispatch(
        setCredentials({
          user: result.user,
          token: "server_cookie", // Placeholder since token is in HTTP-only cookie
        })
      );

      toast.success("Sign In successfully");
      router.push("/");
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed!");
    }
  };
  //password visibility handle
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="from__input-box">
          <div className="form__input-title">
            <label htmlFor="nameEmail">Email or Username</label>
          </div>
          <div className="form__input">
            <input
              className="form-control"
              id="nameEmail"
              type="text"
              {...register("name", {
                required: "Email or Username is required",
              })}
            />
            <ErrorMessage error={errors.name} />
          </div>
        </div>
        <div className="from__input-box">
          <div className="form__input-title flex justify-between">
            <label htmlFor="passwordInput">Password</label>
            <Link href="/auth/forgot-password">
              <small>Forgot Password?</small>
            </Link>
          </div>
          <div className="form__input">
            <input
              className="form-control"
              type={isPasswordVisible ? "text" : "password"}
              id="passwordInput"
              {...register("password", { required: "Password is required" })}
            />
            <ErrorMessage error={errors.password} />
            <div className="pass-icon" onClick={togglePasswordVisibility}>
              <i
                className={`fa-sharp fa-light ${
                  isPasswordVisible ? "fa-eye" : "fa-eye-slash"
                }`}
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <FormControlLabel
            control={
              <Checkbox
                {...register("rememberMe", {
                  required: "You must check 'Remember Me' to proceed",
                })}
                sx={{
                  "&.Mui-checked": {
                    color: "#2563eb",
                  },
                }}
              />
            }
            label={
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Remember me
              </span>
            }
          />
          <ErrorMessage error={errors.rememberMe} />
        </div>
        <div className="mb-4">
          <button
            className={`btn bg-blue-600 text-white w-full ${isLoading ? "opacity-50 cursor-wait" : ""}`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>
    </>
  );
};

export default SignInBasicForm;
