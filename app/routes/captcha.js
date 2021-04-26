let router = require("express").Router();

router.get("hola", async (req, res, next) =>{
  console.log("HOLA!!");
  res.json({ valor: "holamundo" });
})

module.exports = router;