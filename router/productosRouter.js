const router = require("express").Router();

router.get("/:id?", (req, res) => {
  console.log(req.params.id);
});

router.post("/", (req, res) => {
  console.log(req.params);
  console.log(req.body);
});

router.put("/:id", (req, res) => {
  console.log(req.params.id);
});

router.delete("/:id", (req, res) => {
  console.log(req.params.id);
});

module.exports = router;
