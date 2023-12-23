import bcrypt from "bcryptjs";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

// This function hashes the user's password using bcrypt
const hashPassword = async (password) => {
  try {
    const saltRounds = 10; // Salt rounds for bcrypt hash
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

const getToken = () => {
  return JSON.parse(localStorage.getItem("User")).token;
};

const getAuthHeaders = () => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};


export const Register = async () => {
  return await axios.post(`${backendUrl}/signUp`, {
    headers: getAuthHeaders(),
  });
};
