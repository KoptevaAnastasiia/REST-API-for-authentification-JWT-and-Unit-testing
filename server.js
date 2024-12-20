const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(express.json());

 app.use(express.static(path.join(__dirname, 'front_end')));

 const users = [
    {
        username: 'user1',
        password: '$2a$10$CNu9B.bkWWplgsAJVcaUCeuV0FcQZxgzVpoqgNelxuuqvx6lPEcwO',    /* 1*/
    },
];

const SECRET_KEY = 'your_secret_key';

 app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'front_end', 'index.html'));
});

 app.post('/auth', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(400).send('Invalid username or password.');
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
            return res.status(400).send('Invalid username or password.');
        }

        const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Authenticated successfully', token });
    });
});

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).send('Invalid token.');
        }
        req.user = decoded;
        next();
    });
};

app.get('/planets', authenticateToken, (req, res) => {
    const planets = ["Earth", "Mars", "Venus"];
    res.json({ planets });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
