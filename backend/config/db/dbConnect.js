const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            //useCreateIndex:true,
            //useFindAndModify: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('Db is connected succesfully');
    } catch (error) {
        console.log(`Error in db connection: ${error.message}`);
    }
}
//
module.exports = dbConnect;