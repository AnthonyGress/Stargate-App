// relationships
const User = require("./User");
const Bodies = require("./Bodies");
// const Comment = require("./Comment");

// Post.belongsTo(User, {
//   foreignKey: "user_id",
// });

// Post.hasMany(Comment, {
//   foreignKey: "post_id",
//   onDelete: "CASCADE",
// });

// Comment.belongsTo(User, {
//   foreignKey: "user_id",
// });

module.exports = { User, Bodies };
