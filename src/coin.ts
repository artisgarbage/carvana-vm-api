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

// Generic message that is always returned by the API to the client, even if Cue Server has an issue.
let message = { message: "Acknowledged" };

let cueExecPath = `http://${process.env.NETWORK_ID}.${process.env.HOST_ID}/exe.cgi?cmd=`;

console.log(`ℹ️ Coin CUE Server Exec Path: ${cueExecPath}`);

export function drop(attemptRealVend: Boolean) {
  // Local development
  if (process.env.MODE === "local") {
    message.message = "🏡 Local Acknowledged";
    console.log("🏡 Local drop");
    return message;
  }
  // Production Environment
  else {
    if (attemptRealVend) {
      // 🚨 NOTE: THIS WILL ACTUALLY VEND A CAR IF A VALID STOCK NUMBER HAS BEEN SENT TO CUE SERVER, AND THIS CODE IS EXECUTED ON THE CARVANA NETWORK
      console.log("🚨🚨🪙 Coin Drop M1M100: (Full Coin Drop Event) 🪙🚨🚨");
      config.url = `${cueExecPath}m101`;
      axios
        .request(config)
        .then((response) => {
          let cueServerResponseData = JSON.stringify(response.data);
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
      config.url = `${cueExecPath}m1`;
      console.log(`Cue Server URI: ${cueExecPath}m1`);
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
