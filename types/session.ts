// typescript to be added later

require('dot-env');
const session = require('express-session');
const store = new session.MemoryStore();

type T_SESSION = {
    secret: string,
    cookie: {
        maxAge: number,
        secure: boolean,
        sameSite: string,
    },
    resave: boolean,
    saveUninitialized: boolean,
    store: object
};

const Session: T_SESSION = {
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

export {
    Session,
}
