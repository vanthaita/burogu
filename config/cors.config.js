
whilteList = [
    "http://localhost:3000",
    "https://burogu-fontend.vercel.app",
    // process.env.CLIENT_URL,
];

const corsOptions = {
    origin: (origin, cb) => {
        if(whilteList.indexOf(origin) !== -1 || !origin) {
            cb(null, true);
        } else {
            cb(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}


module.exports = corsOptions;