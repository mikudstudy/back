const allowedOrigins = [
    'https://www.mikudstudy.com',
    'https://mikudstudy.com',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:8080',
    'http://localhost:8080',
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'https://api.mikudstudy.com',
    'http://localhost:5173',
    'http://127.0.0.1:5174',
]

function enableCors(req, res, next) {
    if (allowedOrigins.includes(req.headers.origin)) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    }
}

module.exports = enableCors;