import express from 'express';
import apis from './src/apis/api';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';


const app = express();
const PORT = 4000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/STOCKdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// DB -> Collection -> Document (Schemna)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


apis(app);


app.get('/', (req, res) => {
    res.send(`Node and express server on port ${PORT}`);
})

app.listen(PORT, () => {
    console.log(`Start listening on ${PORT}`);
})
