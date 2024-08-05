// middlewares/authMiddleware.js
module.exports = (req, res, next) => {
    const adminHeader = req.headers['admin'];
    if (adminHeader && adminHeader === 'admin') {
        next(); // Permite o acesso
    } else {
        res.status(403).json({ message: 'Acesso negado' }); // Acesso negado
    }
};