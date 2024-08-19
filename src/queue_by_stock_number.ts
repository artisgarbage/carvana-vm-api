import axios from "axios";

// Events

let config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "",
};

export function queue(attemptRealVend: Boolean, stockNumber: String) {
  if (attemptRealVend) {
    console.log("🚨🚨🪙 Attempt to Queue a Real Car 🪙🚨🚨");
    config.url = `http://10.51.205.253/exe.cgi?cmd=set%20requestID%20%${stockNumber}%22`;
    axios
      .request(config)
      .then((response) => {
        let cueServerResponseData = JSON.stringify(response.data);
        console.log(cueServerResponseData);
        return cueServerResponseData;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    console.log("Use test Stock Number TestingTesting123");
    stockNumber = "TestingTesting123";
    config.url = `http://10.51.205.253/exe.cgi?cmd=set%20requestID%20%${stockNumber}%22`;
    axios
      .request(config)
      .then((response) => {
        let cueServerResponseData = JSON.stringify(response.data);
        console.log(cueServerResponseData);
        return cueServerResponseData;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
