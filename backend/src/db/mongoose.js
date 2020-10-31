const mongoose = require('mongoose');

const connectDB = async () => {
    // await mongoose.connect(process.env.MONGODB_URL, {
    await mongoose.connect("mongodb+srv://hack-a-blog:aSJNTWgtSfACjqla@hack-a-blog.8dtk4.mongodb.net/hack-a-blog?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })

    console.log('online db connected.')
}

module.exports = connectDB