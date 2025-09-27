import logo from "./assets/logo.png";
import { FaFacebookF, FaTwitter, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const validationscheme = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });
  const [rememberMe, setRememberMe] = useState(false);
  const handlesubmit = (values) => {
    let domain = "http://82.112.241.233:1993";
    let endpoint = "/api/auth/local";
    let url = domain + endpoint;
    let data = {
      identifier: values.email,
      password: values.password,
    };
    axios
      .post(url, data)
      .then((res) => {
        toast.success("success login");
        if (rememberMe) {
          localStorage.setItem("jwt", res.data.jwt);
        } else {
          sessionStorage.setItem("jwt", res.data.jwt);
        }
        navigate("/");
        console.log(res);
      })
      .catch((err) => {
        toast.error(err.response.data.error.message);
        console.log();
      });
  };
  return (
    <div id="bg" className="h-dvh">
      <div className="overlay flex justify-center items-center bg-[#00000080] h-dvh">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handlesubmit}
          validationSchema={validationscheme}
        >
          <Form className="loginbox w-12/12 md:w-10/12 lg:w-5/12 gap-5 flex flex-col p-5 py-5 md:p-10 justify-center items-center bg-[#000000a6] rounded-2xl">
            <div className="img flex justify-center items-center">
              <img src={logo} alt="logo" />
            </div>
            <div className="userinput flex flex-col gap-3 mt-3 w-full">
              <div className="flex text-[14px] text-white/60 w-full items-center bg-[#232A31] border border-white/10 rounded-lg focus-within:ring-2 focus-within:ring-gray-700 focus-within:ring-offset-2 focus-within:ring-offset-[#09090b] transition-all duration-150 ease-in-out">
                <Field
                  name="email"
                  placeholder="Email Address"
                  type="email"
                  className="bg-transparent text-[#f4f4f5] px-3 py-3 rounded-l-lg focus:outline-none w-full"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-mail mr-3"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
                  <path d="M3 7l9 6l9 -6"></path>
                </svg>
              </div>
              <ErrorMessage
                name="email"
                component={"p"}
                className="text-red-600"
              />
              <div className="flex text-[14px] text-white/60 w-full items-center bg-[#232A31] border border-white/10 rounded-lg focus-within:ring-2 focus-within:ring-gray-700 focus-within:ring-offset-2 focus-within:ring-offset-[#09090b] transition-all duration-150 ease-in-out">
                <Field
                  name="password"
                  placeholder="Password"
                  type="password"
                  className="bg-transparent text-[#f4f4f5] px-3 py-3 rounded-l-lg focus:outline-none w-full"
                />
                <FaLock className="mr-3.5" />
              </div>
              <ErrorMessage
                name="password"
                component={"p"}
                className="text-red-600"
              />
            </div>
            <button
              type="submit"
              className="cursor-pointer text-center w-full py-3 rounded-field text-white bg-[#DC3545]"
            >
              Sign In
            </button>
            <div className="remember-forget w-full flex justify-between">
              <div className="remember flex gap-2">
                <label className="relative flex items-center cursor-pointer group">
                  <input
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer sr-only"
                    type="checkbox"
                  />
                  <div className="w-5 h-5 rounded-lg bg-white border-2  transition-all duration-300 ease-in-out peer-checked:bg-gradient-to-br from-purple-500 to-pink-500 peer-checked:border-0 peer-checked:rotate-12 after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-5 after:h-5 after:opacity-0 after:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIyMCA2IDkgMTcgNCAxMiI+PC9wb2x5bGluZT48L3N2Zz4=')] after:bg-contain after:bg-no-repeat peer-checked:after:opacity-100 after:transition-opacity after:duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
                </label>

                <p className="text-white">Remember Me</p>
              </div>
              <a className="text-white underline" href="#">
                Forgot Password?
              </a>
            </div>
            <div className="login-methods flex flex-col justify-center items-center gap-5">
              <p className="text-white/50">Or Login with</p>
              <div className="other-login flex gap-4">
                <div className="bg-[#3b5998] p-3 rounded-md cursor-pointer">
                  <FaFacebookF className="text-white" size={20} />
                </div>
                <div className="bg-[#1DA1F2] p-3 rounded-md cursor-pointer">
                  <FaTwitter className="text-white" size={20} />
                </div>
                <div className="bg-[#DB4437] p-3 rounded-md cursor-pointer">
                  <FaGoogle className="text-white" size={20} />
                </div>
                <div className="bg-[#0077B5] p-3 rounded-md cursor-pointer">
                  <FaLinkedinIn className="text-white" size={20} />
                </div>
              </div>
              <p className="text-white/50">
                New to Oxyy?
                <span>
                  <a className="text-white underline ml-1" href="#">
                    Sign up now
                  </a>
                </span>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
