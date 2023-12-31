import 'dot-env';
import session from 'express-session';
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

export {
    OPT_SESSION
}