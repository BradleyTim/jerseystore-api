const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((connection) => {
    console.log('mongo connected!!!');
}).catch((error) => {
    console.log('there was an error', error);
});