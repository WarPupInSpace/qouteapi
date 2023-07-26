import express, {
    Router
} from'express';
import { v4 as uuidv4 } from 'uuid';
import morgan  from'morgan';
import cors from'cors';
import session from'express-session';
import { OPT_SESSION } from'./types/session.js';
import {loginRouter} from'./routes/login.js';
import logger from'dev-logger';
import { authorizedUser } from'./utils/middleware/authorize.js';
import { quotes } from'./data.js';
import { getRandomElement } from'./utils.js';

const app = express();
const QuoteRouter = Router();

const PORT = process.env.PORT || 4001;

const logRequest = (req, res, next) => {
    console.log("Method Recieved: " + req.method);
    next();
}

app.set('port', PORT);
app.use(express.static('public'));
// eue
app.use(express.urlencoded({ extended: false }));
// ejson
app.use(express.json())

app.use(session(OPT_SESSION));
app.use(logRequest, morgan('tiny'));
app.use(cors())
app.use(authorizedUser);

app.use(loginRouter);
app.use(QuoteRouter);
//hanlde error response


// must go after use(router);
const errorHandler = (err, req, res, next) => {
    logger.log(`\nerror_status: ${err.status} \nerror_message: ${err.message}`);
    err.status ||= 500;
    err.message ||= "has not been set";
    res.status(err.status).send(err.message);
}

app.use(errorHandler);


QuoteRouter.get('/api/quotes/random', (req, res, next) => {
    const aQuote = getRandomElement(quotes);
    if (aQuote) {
        res.status(200).json({
            quote: aQuote
        });
    } else {
        res.status(404).send("not found");
    }
});



QuoteRouter.get('/api/quotes', (req, res, next) => {
    if (req.query.person == undefined) {
        res.status(200).json({ quotes: quotes });
        return;
    };
    const person = req.query.person;
    const quote = quotes.filter(quote => {
        return quote.person.toLowerCase() == person.toLowerCase();
    })
    res.status(200).json({ quotes: quote });
});


QuoteRouter.post('/api/quotes', (req, res, next) => {
    const { quote, person } = req.query;
    if ([quote, person].includes("")) {
        res.status(400).send("bad request: body not complete");
        return;
    }
    const checkDuplicate = quotes.some((aquote) => {
        return aquote.person == person && aquote.quote == quote;
    });
    if (checkDuplicate) {
        res.status(403).json(
            {
                "message": "Already exists",
                "code": "AlreadyExists"
            }
            )
        return;
    }
    const id = uuidv4();
    console.log(id);
    quotes.push({ quote: quote, person: person, id: id });
    res.status(201).json({
        quote: quotes[quotes.length - 1]
    });
})

QuoteRouter.param('id', (req, res, next, id) => {
    const exists = quotes.some((quote) => {
        return quote.id == id;
    })
    if (!exists) {
        res.status(404).json({
            "message": "Does not exist",
            "code": "NotFound",
        });
        return;
    }
    req.id = id;
    next();
})

QuoteRouter.put('/api/quotes/:id', (req, res, next) => {
    const quote = req.body;
    if (!quote) {
        res.status(400).send("body not completed")
        return;
    }
    const id = req.id;
    const index = quotes.findIndex(quote => quote.id == id);
    quotes[index] = quote;
    res.status(201).json({ msg: "here"});
})

QuoteRouter.delete('/api/quotes/:id', (req, res, next)=>{
    const id = req.id; 
    console.log(id)
    quotes = quotes.filter(quote => {
        return quote.id != id
    })
    res.status(202).send("content has been deleted");
})




app.listen(app.get('port'), () => {
    console.info(`Server listen on port ${app.get('port')}`);
})


