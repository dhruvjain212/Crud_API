const jwt = require('jsonwebtoken');

const fetchToken = (req, res) => {
    const jwtToken = req.headers['authorization'];
    console.log(jwtToken)
    if (!jwtToken) {
        return res.status(403).json({ message: 'No token provided!' });
    }
     res.status(200)
            .json({
                message: "Jwt Token fetched Success",
                success: true,
                jwtToken
            })
    
}

module.exports = {
   fetchToken
}