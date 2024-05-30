const Sequelize = require('sequelize');

const sequelize = new Sequelize('test_seq', 'root', 'mysql1412', {
    host: 'localhost',
    dialect: 'mysql',
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require('./user')(sequelize, Sequelize);
db.posts = require('./post')(sequelize, Sequelize);

/* Associations */
// db.users.hasMany(db.posts, { as: 'posts' });
// db.posts.belongsTo(db.users, { foreignKey: 'userId', as: 'user' });

module.exports = db;
