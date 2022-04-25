const mongoose = require("mongoose");
const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ],
        evenements: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "evenementSchema"
            }
        ]
    })
);
module.exports = User;
