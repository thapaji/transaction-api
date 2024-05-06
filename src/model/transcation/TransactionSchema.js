import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

},
    {
        timestamps: true
    }
)

export default mongoose.model('transactions', TransactionSchema)
