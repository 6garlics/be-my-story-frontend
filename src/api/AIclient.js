import axios from "axios";

const AIclient = axios.create();
// AIclient.defaults.baseURL = "http://220.117.120.143:8000";
AIclient.defaults.baseURL = "http://tori-fairytale.store";
// AIclient.defaults.withCredentials = true;
AIclient.defaults.headers.common["Content-Type"] = "application/json";

export default AIclient;
