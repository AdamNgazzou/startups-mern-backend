const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    author_id: {
        type: String,
        ref: 'Author',
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20,
    },
    image: {
        type: String,
        required: true,
    },
    pitch: {
        type: String, // i could use a rich text field or store markdown as text
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Startup = mongoose.model('Startup', startupSchema);

module.exports = Startup;
