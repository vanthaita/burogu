const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const corsOptions = require('../backend/config/cors.config');
const verifyJWT = require('../backend/middlewares/jwt.middleware')
const app = express();
const PORT = process.env.PORT || 8080


app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());



app.use('/register', require('../backend/routes/register.route'));
app.use('/login', require('../backend/routes/login.route'));

app.use('/get-all-post', require('../backend/routes/post/get.all.post.route'))
app.use('/get-post', require('../backend/routes/post/get.post.route'))
app.use('/u/get-user', require('../backend/routes/get.user.route'));
app.use('/refreshtoken', require('../backend/routes/refreshToken.route'));
app.use('/logout', require('../backend/routes/logout.route'));
app.use(verifyJWT);

app.use('/follow', require('../backend/routes/user/follow.route'));
app.use('/add-post', require('../backend/routes/post/add.post.route'));
app.use('/add-comment', require('../backend/routes/comment/post.comment'));
app.use('/vote', require('../backend/routes/vote/vote.route'));



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})