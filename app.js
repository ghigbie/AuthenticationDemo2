const express = require("express"),
      app = express();
      
app.set("view engine", "ejs");
      
app.get("*", (req, res) => {
    res.render("notfound");
});

app.listen(process.env.PORT, process.env.IP, () => {
  console.log("Server is listening");  
});