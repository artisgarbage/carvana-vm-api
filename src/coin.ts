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

let message = { message: "Acknowledged" };

export function drop(attemptRealVend: Boolean) {
  // 🚨 IF this call should invoke a vend attempt
  // 🚨 NOTE: THIS WILL ACTUALLY VEND A CAR IF A VALID STOCK NUMBER HAS BEEN SENT TO CUE SERVER, AND THIS CODE IS EXECUTED ON THE CARVANA NETWORK

  if (process.env.MODE === "local") {
    message.message = "🏡 Local Acknowledged";
    console.log("🏡 Local drop");
    return message;
  }
  // Production Environment
  else {
    if (attemptRealVend) {
      console.log("🚨🚨🪙 Coin Drop M1M100: (Full Coin Drop Event) 🪙🚨🚨");
      config.url = "10.51.205.61/Home/CallLighting?command=m100m101";
      axios
        .request(config)
        .then((response) => {
          let cueServerResponseData = JSON.stringify(response.data);
          // Log response from Cue Server
          console.log(cueServerResponseData);
        })
        .catch((error) => {
          console.log(error);
        });
      // ALWAYS return the default message, even if Cue server responded unsucessfully
      return message;
    }
    // TESTING variation of this method where attemptRealVend is false
    else {
      console.log("🪙🪙🪙 Coin Drop M1: (Intro Lights & Audio Only) 🪙🪙🪙");
      config.url = "http://10.51.205.253/exe.cgi?cmd=m1";
      axios
        .request(config)
        .then((response) => {
          let cueServerResponseData = JSON.stringify(response.data);
          console.log(cueServerResponseData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // ALWAYS return the default message, even if Cue server responded unsucessfully
    return message;
  }
}
