import axios from "axios";
// use relative paths so Vite dev server proxy (configured in vite.config.js)
// forwards `/api` requests to the backend during development
const api = axios.create({
  baseURL: '',
  withCredentials: true,
});

const getErrorMessage = (error) => {
  return error?.response?.data?.message || error?.message || "Request failed";
};


export async function register({ username, email, password }) {
  try {
    const response = await api.post(
      "/api/auth/register",
      {
        username,
        email,
        password,
      }
    )
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function login({ email, password }) {
  try {
    const response = await api.post(
      "/api/auth/login",
      {
        email,
        password,
      }
    )
      return response.data
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
export async function logout({}){
  try {
    const response = await api.get("/api/auth/logout")
    return response.data
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
export async function getMe(){
    try {
        const response = await api.get("/api/auth/get-me")
        return response.data
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }

}
