
module.exports = {
    verifyInfo
};

function verifyInfo (req, res, next)  {
    if (!req.body.username || !req.body.email) {
        res.status(400).json({ message: "Please include username and email" });
    } else {
        console.log('else in verify');
        next();
    }

}

