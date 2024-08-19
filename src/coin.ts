import axios from "axios";

// Events
// m1: Coin drop audio
// m100m101: Main coin drop command
//url: "10.51.205.61/Home/CallLighting?command=m100m101",

let config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "",
};

export function drop(attemptRealVend: Boolean) {
  // 🚨 IF this call should invoke a vend attempt
  // 🚨 NOTE: THIS WILL ACTUALLY VEND A CAR IF A VALID STOCK NUMBER HAS BEEN SENT TO CUE SERVER, AND THIS CODE IS EXECUTED ON THE CARVANA NETWORK

  if (attemptRealVend) {
    console.log("🚨🚨🪙 Coin Drop M1M100: (Full Coin Drop Event) 🪙🚨🚨");
    config.url = "10.51.205.61/Home/CallLighting?command=m100m101";
    axios
      .request(config)
      .then((response) => {
        let responseData = JSON.stringify(response.data);
        console.log(responseData);
        return responseData;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // TESTING variation of this method where attemptRealVend is false
  else {
    console.log("🪙🪙🪙 Coin Drop M1: (Intro Lights & Audio Only) 🪙🪙🪙");
    config.url = "http://10.51.205.253/exe.cgi?cmd=m1";
    axios
      .request(config)
      .then((response) => {
        let responseData = JSON.stringify(response.data);
        console.log(responseData);
        return responseData;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return "Drop Success";
}
