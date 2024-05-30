module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('post', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        userId: {
            type: Sequelize.INTEGER,
        },
    });

    return Post;
};
