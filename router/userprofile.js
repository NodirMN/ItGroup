const { Router } = require("express");
const router = Router();
const Users = require("../model/users");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const upload = require("../middleware/file");

///////////////////////////Users api send
router.get("/", auth, async (req, res) => {
    let users = await Users.find().lean();
    let user = req.session.user;
    res.render("pages/profile", {
        title: `Изменить данные админа`,
        name: `${user.name}`,
        email: `${user.email}`,
        users,
        error: req.flash("error"),
        success: req.flash("success"),
    });
});
