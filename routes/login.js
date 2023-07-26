const express = require('express');
const loginRouter = express.Router();


loginRouter.get('/login', (req, res) => {
    // create login page
    res.send("on login page");
})

loginRouter.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    const userExists = mockUser.some((user) => {
        return user.username == username && user.password == password
    });
    if (!userExists) {
        const err = Error("Username or password incorrect");
        err.status = 404;
        next(err);
    } else {
        req.session.authenticated = true;
        req.session.user = {
            username,
            password,
        }
        res.json(req.session);
    }
})


const mockUser = [
    {
        username: "warpup",
        password: "space",
    }
]

module.exports = {
    loginRouter
};