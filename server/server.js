const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();


const app = express();
app.use(cors());

//connect to database
mongoose.connect(process.env.DATABASE , {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true    
})
.then(() => {
    console.log('Database connected...');
})
.catch((err) => {
    console.log(err);
});

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const imageUploadRoutes = require('./routes/image');
const followRoutes = require('./routes/follow');
//Middlewares
app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api', postRoutes);
app.use('/api', userRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api', imageUploadRoutes);
app.use('/api', followRoutes);
app.use(morgan('dev'));



const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening port ${port} on localhost...`);
})