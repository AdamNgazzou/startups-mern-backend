const mongoose = require('mongoose');

// Define the schema for the "Author"
const authorSchema = new mongoose.Schema({
    id: {
        type: String, // Integer ID
        required: true,
        unique: true,
    },
    name: {
        type: String, // Author name
        required: true,
    },
    username: {
        type: String, // Author username
        required: true,
        unique: true,
    },
    email: {
        type: String, // Author email
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'], // Basic email validation
    },
    image: {
        type: String, // URL for the author's image
        required: true,
    },
    bio: {
        type: String, // Author bio
        required: true,
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

const Author = mongoose.models.Author || mongoose.model('Author', authorSchema);

module.exports = Author;
