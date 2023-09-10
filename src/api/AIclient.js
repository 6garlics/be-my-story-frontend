import axios from "axios";

const AIclient = axios.create();
AIclient.defaults.baseURL =
  "https://yc2bgtwjbosyjziwdos7kbbvma0cdaql.lambda-url.eu-north-1.on.aws";
// AIclient.defaults.withCredentials = true;
AIclient.defaults.headers.common["Content-Type"] = "application/json";

export default AIclient;
