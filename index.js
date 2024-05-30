const express = require('express');
const db = require('./conn');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello');
});

app.post('/create-user', (req, res) => {
    const { name, email } = req.body;

    const users = db.users;

    users.create({ name, email });

    res.status(201).json({ message: 'Created' });
});
app.post('/create-post', (req, res) => {
    const { name } = req.body;

    const { posts } = db;

    posts.create({ name, userId: 1 });

    res.status(201).json({ message: 'Created' });
});
app.post('/create-posts', (req, res) => {
    const { posts } = db;

    for (let i = 0; i < 1000; i++) {
        posts.create({ name: "John doe's post - " + (i + 1), userId: 1 });
    }

    res.status(201).json({ message: 'Created' });
});

app.get('/users', (req, res) => {
    db.users
        .findAll({ include: ['posts'] })
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((e) => console.log(e));
});
app.get('/users1', async (req, res) => {
    const { limit, offset } = req.query;
    const results = await db.sequelize.query(
        'select name from posts where userId = 1 limit ? offset ?',
        {
            replacements: [parseInt(limit), parseInt(offset)],
            type: db.sequelize.QueryTypes.SELECT,
        }
    );
    const data = results.map((r) => r.name);
    res.status(200).json({ data });
});

db.sequelize
    .sync({ force: true })
    .then(() => {
        console.log('Database connected');
    })
    .catch((e) => console.log(e));
app.listen(8787, () => {
    console.log('http://localhost:8787');
});
