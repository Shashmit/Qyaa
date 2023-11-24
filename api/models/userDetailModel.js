const mongoose = require('mongoose');

const userDetailSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    aadhaarDetails: {
        type: Object
    }
});

const UsersDetails = mongoose.model('UsersDetails', userDetailSchema);
module.exports = UsersDetails;