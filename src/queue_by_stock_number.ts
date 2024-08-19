import axios from "axios";

// Events

let config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "",
};

// Generic message that is always returned by the API to the client, even if Cue Server has an issue.
let message = { message: "Acknowledged" };

let cueExecPath = `http://${process.env.NETWORK_ID}.${process.env.HOST_ID}/exe.cgi?cmd=`;

console.log(`ℹ️ Queue CUE Server Exec Path: ${cueExecPath}`);

export function queue(attemptRealVend: Boolean, stockNumber: String) {
  if (attemptRealVend) {
    console.log("🚨🚨🪙 Attempt to Queue a Real Car 🪙🚨🚨");
    config.url = `${cueExecPath}set%20requestID%20%${stockNumber}%22`;
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
  } else {
    console.log("Use test Stock Number TestingTesting123");
    stockNumber = "TestingTesting123";
    config.url = `${cueExecPath}set%20requestID%20%${stockNumber}%22`;
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
}
