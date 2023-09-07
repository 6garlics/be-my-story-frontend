import axios from "axios";

const client = axios.create();
client.defaults.baseURL = "https://www.bemystory.store";
client.defaults.withCredentials = true;
client.defaults.headers.common["Content-Type"] = "application/json";

const token = localStorage.getItem("beMyStoryToken");
console.log("현재 토큰", token);

client.defaults.headers.common["Authorization"] = token
  ? `Bearer ${token}`
  : null;

console.log(
  "현재 설정된 토큰",
  client.defaults.headers.common["Authorization"]
);

export default client;
