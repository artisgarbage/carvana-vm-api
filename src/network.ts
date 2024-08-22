const { networkInterfaces } = require("os");

const nets = networkInterfaces();
const results = Object.create(null);

export function getNetworkInfo() {
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
      const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
      if (net.family === familyV4Value && !net.internal) {
        console.log(`Network Address: ${net.address}, Name: ${name}`);
        if (!results[name]) {
          results[name] = [];
        }
        // Split the IP address into octets
        const octets = net.address.split(".");
        // Join the first three octets with dots and log them to the console
        const firstThreeOctets = octets.slice(0, 3).join(".");
        console.log(`Network ID: ${firstThreeOctets}`);
        results[name].push(firstThreeOctets);
      }
    }
  }
  return results;
}
