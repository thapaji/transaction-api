import TransactionSchema from "./TransactionSchema.js";

/*CREATE*/
export const insertTransaction = (transaction) => {
    console.log(transaction)
    return TransactionSchema(user).save();
}

/*READ*/
export const getTransactions = () => {
    return TransactionSchema.find();
}

export const getTransactionsByUserId = (userId) => {
    return TransactionSchema.find({ userId });
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