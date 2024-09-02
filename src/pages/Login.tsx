import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { fetchSignin } from "../apis/login_signupApi";
import { RegistrationCard } from "../components";

const Login = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loadingTrue, loadingFalse, setUser } = useAuth();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      email,
      password,
    };
    const res = await fetchSignin(body);
    if (res.status === "success") {
      setUser({
        name: res.data.name,
        email: res.data.email,
        _id: res.data._id,
      });
      loadingTrue();
      login(res.token);
      navigate("/");
      toast.success(`Welcome back ${res?.data?.user?.name}`, {
        theme: "colored",
      });
      loadingFalse();
    }
  };

  const handleJoinNowClick = () => {
    setShowRegistration(true);
  };
  const handleLoginClick = () => {
    setShowRegistration(false);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className="h-screen bg-gray-100">
      {/* LINKEDIN LOGO */}
      <div className="p-8 px-14">
        <img
          className="w-28"
          src="/LinkedIn_logo_footer.svg"
          alt="linkedin_footer_logo"
        />
      </div>
      {showRegistration ? (
        <RegistrationCard openSignin={handleLoginClick} />
      ) : (
        <div className="flex justify-center items-center">
          <div className="w-[95%] sm:w-2/3 md:w-1/2 max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
            {/* LOGIN FORM */}
            <form onSubmit={handleSubmit} className="p-2 min-[400px]:p-6">
              <div className="flex flex-col gap-4">
                {/* FORM HEADER */}
                <div className="mb-4">
                  <h2 className="text-3xl font-semibold mb-1">Sign in</h2>
                  <p className="text-gray-600">
                    Stay updated on your professional world
                  </p>
                </div>
                {/* INPUTS: EMAIL AND PASSWORD */}
                <div className="flex flex-col gap-2 mb-4">
                  {/* EMAIL */}
                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  {/* PASSWORD */}
                  <div className="relative">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 mt-2"
                    />
                    {/* PASSWORD VISIBILITY ICON */}
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
                {/* SIGN IN BUTTON */}
                <button
                  type="submit"
                  className="w-full px-3 py-2 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none hover:bg-indigo-600"
                >
                  Sign in
                </button>
                <div className="mt-8 flex items-center gap-1">
                  <p className="text-gray-600">New to LinkedIn?</p>
                  <button
                    onClick={handleJoinNowClick}
                    className="font-semibold text-indigo-600 rounded-m hover:bg-blue-200 px-3 py-1 rounded-full hover:underline"
                  >
                    JOIN NOW
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Login;
