
const authenticateToken = (req, res) =>{
    const token = req.cookies.token

    if(!token) return res.status(401).json({error: "Unauthorized"});

    jwt.verify(token, process.env.MY_SECRET_KEY, (err, result) =>{
        if (err) return res.sendStatus(403); 
        req.user = user; 
      
        next();
    })
}

export default authenticateToken