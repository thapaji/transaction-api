import TransactionSchema from "./TransactionSchema.js";

/*CREATE*/
export const insertTransaction = (transaction) => {
    console.log(transaction)
    return TransactionSchema(transaction).save();
}

/*READ*/
export const getTransactions = () => {
    return TransactionSchema.find();
}

export const getTransactionsByUserId = (userId) => {
    return !userId ? null : TransactionSchema.find({ userId }).sort({ date: 1 });
}

export const getTransactionsBetweenDates = (userId, startDate, endDate) => {
    return !userId || !startDate || !endDate ? null : TransactionSchema.find({
        userId: userId,
        date: { $gte: startDate, $lte: endDate }
    }).sort({ date: 1 });
}

/*UPDATE*/
export const updateTransaction = (_id, transaction) => {
    console.log(listItem);
    return TransactionSchema.findByIdAndUpdate({ _id }, { ...transaction }, { new: true });
}

/*DELETE ONE or  MANY*/
export const deleteTransaction = (ids) => {
    return TransactionSchema.deleteMany({ _id: { $in: ids } });
}

export const deleteUserTransaction = (userId, idsToDelete) => {
    return !userId
        ? null
        : TransactionSchema.deleteMany({
            _id: { $in: idsToDelete },
        });
}