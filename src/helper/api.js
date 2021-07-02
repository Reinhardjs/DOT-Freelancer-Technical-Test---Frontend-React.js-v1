import * as axios from "axios";

export default class Api {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = "http://localhost:8000/starter";
  }

  init = () => {
    this.api_token = "f35d553971278c28d87f8123ca155273";

    let headers = {
      "content-type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*"
    };

    if (this.api_token) {
      headers.key = this.api_token;
    }

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    });

    return this.client;
  };

  getProvince = (data) => {
    return this.init().get("/province", {params: data});
  };

  getCity = (data) => {
    // const data = new URLSearchParams();
    // data.append('age', '22')
    return this.init().get("/city", {params: data});
  };

  getCost = (data) => {
    // const data = new URLSearchParams()
    // data.append('age', '22')
    return this.init().post("/cost", data);
  };
}
