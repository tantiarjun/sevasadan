import mongoose from 'mongoose';

const OpinionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    file:{
        type: String,
        required: true
    },
    timeSlot: {
        type: String,
        required: true
    }
});

const Opinion = mongoose.model('Opinion', OpinionSchema);

export default Opinion; 