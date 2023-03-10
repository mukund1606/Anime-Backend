const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      route: "/latest",
      query: ["?page=", "default page = 1"],
    },
    {
      route: "/trending",
      query: ["?page=", "default page = 1"],
    },
    {
      route: "/best",
      query: ["?page=", "default page = 1"],
    },
    {
      route: "/search",
      query: ["?keyword=", "default phrase = shield hero"],
    },
    {
      route: "/details",
      query: [
        "?id=",
        "&page=",
        "&slug=",
        "default id = 5792",
        "default page = 1",
        "default slug = tate-no-yuusha-no-nariagari",
      ],
    },
    {
      route: "/episode",
      query: [
        "?id=",
        "&slug=",
        "&episode",
        "default id = 5792",
        "default slug = tate-no-yuusha-no-nariagari",
        "default episode = 1",
      ],
    },
    {
      route: "/episodeDirectURL",
      query: [
        "?id=",
        "&slug=",
        "&episode=",
        "&type(dub or sub)=",
        "default id = 5792",
        "default slug = tate-no-yuusha-no-nariagari",
        "default episode = 1",
        "default type = 'sub'"
      ],
    },
  ]);
});

router.use("/latest", require("./latest"));
router.use("/trending", require("./trending"));
router.use("/best", require("./best"));
router.use("/search", require("./search"));
router.use("/details", require("./details"));
router.use("/episode", require("./episode"));
router.use("/episodeDirectURL", require("./episodeDirectURL"));

module.exports = router;