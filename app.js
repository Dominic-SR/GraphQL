const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

mongoose.set('useNewUrlParser',true);
mongoose.set('useUnifiedTopology',true);
//mongoose.connect('mongodb+srv://admin:admin@cluster0.v1pds.mongodb.net/test')
mongoose.connect('mongodb://localhost:27017/shop')
mongoose.connection.once('open', () =>{
    console.log("Connected To Database");
})

app.use('/graphql', graphqlHTTP({
schema,
graphiql:true , 
}));

app.listen(4000,() => {
    console.log("server running on 4000")
});