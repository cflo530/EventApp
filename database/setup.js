const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://cflo530:event123@cluster0.x6mkf.mongodb.net/eventapp?retryWrites=true&w=majority';

module.exports = () => {
    mongoose.connect(connectionString,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }, (err) => {
        if(err){
            console.log(err);
        }
        else{
            console.log('Database connection successful');
        }
    });
};