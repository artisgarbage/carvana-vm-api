import axios from "axios";

let config = {
  method: "post",
  maxBodyLength: Infinity,
  url: "10.51.205.61/Home/CallLighting?command=m100m101",
  headers: {
    "X-Api-Key": "SuperSecretApiKey123",
  },
};

axios
  .request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
