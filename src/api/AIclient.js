import axios from "axios";

const AIclient = axios.create();
// AIclient.defaults.baseURL = "http://220.117.120.143:8000";
// AIclient.defaults.withCredentials = true;
AIclient.defaults.baseURL =
  "https://orcaterm.tencentcloud.com/ide/05d1513b-6a0d-4f91-934b-5a0816803c82/proxy/8000/";
AIclient.defaults.headers.common["Content-Type"] = "application/json";

export default AIclient;
