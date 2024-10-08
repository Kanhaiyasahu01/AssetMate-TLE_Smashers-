import {toast} from "react-hot-toast";

import { setLoading,setToken } from "../../slice/authSlice";
import { setUser } from "../../slice/profileSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
} = endpoints
  
export function sendOtp(email, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", SENDOTP_API, {
          email,
          checkUserPresent: true,
        })
        console.log("SENDOTP API RESPONSE............", response)
  
        console.log(response.data.success)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("OTP Sent Successfully")
        navigate("/verify-email")
      } catch (error) {
        console.log("SENDOTP API ERROR............", error)
        toast.error("Could Not Send OTP")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }


  export function signUp(
    name,
    email,
    password,
    otp,
    role,
    address,
    phoneNumber,
    gstIn,
    navigate,
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                name,
                email,
                password,
                otp,
                role,
                address,
                phoneNumber,
                gstIn,
            });

            console.log("SIGNUP API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Signup Successful");
            navigate("/login");
        } catch (error) {
            console.log("SIGNUP API ERROR............", error);
            toast.error("Signup Failed: " + error.message);
            navigate("/signup");
        } finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    }
}

export function login(email, password, navigate) {
  return async (dispatch) => {
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true));
      try {
          const response = await apiConnector("POST", LOGIN_API, {
              email,
              password,
          });

          console.log("LOGIN API RESPONSE............", response);

          if (!response.data.success) {
              throw new Error(response.data.message);
          }

          toast.success("Login Successful");
          dispatch(setToken(response.data.token));

          // Generate user image
          const userImage = response.data?.user?.image
              ? response.data.user.image
              : generateInitialsImage(response.data.user.name);

          // Dispatch user information to the Redux store
          dispatch(setUser({ ...response.data.user, image: userImage }));

          // Save user and token to localStorage
          const userData = { ...response.data.user, image: userImage };
          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem("user", JSON.stringify(userData));
          navigate("/dashboard/view");
      } catch (error) {
          console.log("LOGIN API ERROR............", error);
          toast.error("Login Failed");
      } finally {
          dispatch(setLoading(false));
          toast.dismiss(toastId);
      }
  }
}

// Function to generate image based on the first letter of the user's name
function generateInitialsImage(name) {
  const firstLetter = name.charAt(0).toUpperCase();
  const color = '#' + Math.floor(Math.random() * 16777215).toString(16); // Generate a random color

  // Create an SVG image with the first letter on a colored background
  const svgImage = `
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <rect width="100%" height="100%" fill="${color}" />
          <text x="50%" y="50%" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle">${firstLetter}</text>
      </svg>
  `;

  // Convert the SVG to a data URL
  const svgDataUrl = 'data:image/svg+xml;base64,' + btoa(svgImage);
  return svgDataUrl;
}
