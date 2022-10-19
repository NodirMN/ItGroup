const { Router } = require("express");
const auth = require("../middleware/auth");
const router = Router();

router.get("/", async (req, res) => {

        res.render("about/index", {
        
            title: "Biz haqimizda",
        });
});

module.exports = router;
