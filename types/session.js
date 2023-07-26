require('dot-env');
const session = require('express-session');
const store = new session.MemoryStore();

const OPT_SESSION = {
    secret: "toBeReplaced",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: true,
        sameSite: "none",
    },
    resave: false,
    saveUninitialized: false,
    store,
}

module.exports = {
    OPT_SESSION,
}
