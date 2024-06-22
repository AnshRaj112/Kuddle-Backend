const { signup } = require("../controllers/usersController");

const router = require("express").Router();

router.post("/signup", signup);

module.exports = router;