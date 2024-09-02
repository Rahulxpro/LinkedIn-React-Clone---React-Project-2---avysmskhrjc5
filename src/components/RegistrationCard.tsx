import React, { useState } from "react";
import { fetchSignup } from "../apis/login_signupApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
// import { useAuth } from "../contexts/AuthProvider";

interface RegistrationCardProps {
  openSignin: () => void;
}

const RegistrationCard: React.FC<RegistrationCardProps> = ({ openSignin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const signup = async () => {
    const body = {
      name,
      email,
      password,
    };
    const res = await fetchSignup(body);
    if (res.status === "success") {
      setUser({
        name: res.data.user.name,
        email: res.data.user.email,
        _id: res.data.user._id,
      });
      localStorage.setItem("token", res.token);
      toast.success(`Welcome ${res?.data?.user?.name}`, { theme: "colored" });
      navigate("/");
    } else {
      if (res.message === "User already exists") {
        toast.error("You have already an account", { theme: "colored" });
      }
    }
    // console.log("signup res", res);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    if (name !== "" && emailRegex.test(email) && passwordRegex.test(password)) {
      signup();
    } else {
      if (
        name === "" &&
        emailRegex.test(email) &&
        passwordRegex.test(password)
      ) {
        toast.error("Fill name field", { theme: "colored" });
      }
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      <h1 className="text-center text-4xl mb-6">
        Make the most of your professional life
      </h1>
      <div className="flex justify-center items-center">
        <div className="w-[95%] sm:w-2/3 md:w-1/2 max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
          {/* LOGIN FORM */}
          <form onSubmit={handleSubmit} className="p-2 min-[400px]:p-6">
            <div className="flex flex-col gap-4">
              {/* FORM HEADER */}
              <div className="mb-4">
                <h2 className="text-3xl font-semibold mb-1">Sign up</h2>
              </div>
              {/* INPUTS: EMAIL AND PASSWORD */}
              <div className="flex flex-col gap-2 mb-4">
                {/* NAME */}
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={handleNameChange}
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                />
                {/* EMAIL */}
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                />
                {/* PASSWORD */}
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 mt-2"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  >
                    {passwordVisible ? (
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-7.874m0 18c-3.721 0-6.875-2.943-7.5-7a9.97 9.97 0 011.563-7.874m0-14c-2.943 0-5.625 1.672-6.5 4.059a9.97 9.97 0 011.563-7.874m0-10a10.025 10.025 0 0113.875 18.825"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              {errorMessage && (
                <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
              )}
              {/* SIGN IN BUTTON */}
              <button
                type="submit"
                className="w-full px-3 py-2 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none hover:bg-indigo-600"
              >
                Agree & Join
              </button>
            </div>
          </form>
          <div className="mt-4 pb-8 pl-2 min-[400px]:pl-10 flex items-center gap-1">
            <p className="text-gray-600">Already you have an account?</p>
            <button
              onClick={openSignin}
              className="w-fit font-semibold text-indigo-600 rounded-m hover:bg-blue-200 px-3 py-1 rounded-full hover:underline"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationCard;
