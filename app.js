const express = require("express"),
      app = express();
      

app.listen(process.env.PORT, process.env.IP, () => {
  console.log("Server is listening");  
});