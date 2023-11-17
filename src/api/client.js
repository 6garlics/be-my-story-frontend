import axios from "axios";

const client = axios.create();
client.defaults.baseURL = "https://www.bemystory.store";
client.defaults.withCredentials = true;
client.defaults.headers.common["Content-Type"] = "application/json";

const token = localStorage.getItem("beMyStoryToken");

client.defaults.headers.common["Authorization"] = token
  ? `Bearer ${token}`
  : null;

export default client;
