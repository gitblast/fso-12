const express = require("express");
const router = express.Router();

const configs = require("../util/config");

const redis = require("../redis");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

router.get("/statistics", async (_, res) => {
  const current = await redis.getAsync("added_todos");

  const added_todos = current ? Number(current) : 0;

  res.send({
    added_todos,
  });
});

module.exports = router;
