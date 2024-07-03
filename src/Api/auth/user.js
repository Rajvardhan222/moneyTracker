import { apiClient } from "../ApiClient";

export let loginUser = async ({ email, password }) => {
  
    let loginUser = await apiClient.post("/users/login", {
      email: email,
      password: password,
    });

    return loginUser;
  
};

export let regesterUserOtp = async ({ OTP }) => {
  try {
    let verifyOTP = await apiClient.post("/users/verifyOtp", {
      otp: OTP,
    });

    

    return verifyOTP;
  } catch (error) {
    console.log("auth || user.js || VerifyOTP", error);
  }
};

export let regesterUser = async ({ name, email, password }) => {
  try {
    let regesterUser = await apiClient.post("/users/regester", {
      name: name,
      email: email,
      password: password,
    });

    return regesterUser;
  } catch (error) {
    console.log("auth || user.js || regesterUser", error);
    throw new Error(error.message)
  }
};

export const verifyAccessTOken = async ( )=>{
  try {
    let verify = await apiClient.post("/users/verifyAccessToken")

    return verify
  } catch (error) {
    console.log(error.message);
  }
}


export const refreshAccessTOken = async () => {
  try {
    let refreshToken = await apiClient.post("/users/regenerateAccessToken")

    return refreshToken
  } catch (error) {
    console.log(error);
  }
}

export const logout = async () => {
 let logOut = await apiClient.post("/users/logout")
 return logOut
}
