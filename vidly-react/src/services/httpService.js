import axios from "axios";
import { toast } from "react-toastify";

function setJWT(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

axios.interceptors.response.use(null, (error) => {
  if (
    error.response.status &&
    error.response.status >= 400 &&
    error.response.status <= 500
  )
    return Promise.reject(error);

  console.log("INTERCEPTOR CALLED");
  console.log("Logging error ", error);
  toast.alert("Something failed while deleting a post");

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJWT,
};
