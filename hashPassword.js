


const bcrypt = require('bcryptjs');
const password = '1';

bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) throw err;

    console.log('Hashed Password:', hashedPassword);
});
