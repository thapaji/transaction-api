import express from 'express'
import { insertTransaction, updateTransaction, getTransactionsByUserId, deleteUserTransaction } from '../model/transcation/TransactionModel.js'
const router = express.Router()

/* GET*/
router.get("/", async (req, res) => {
    try {
        const { authorization } = req.headers;
        const result = (await getTransactionsByUserId(authorization)) ?? [];
        console.log(result);
        res.json({
            status: 'success',
            message: "Transaction List read",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Something went wrong in server. Please contact the provider.",
        });
    }
});

/* POST*/
router.post("/", async (req, res) => {
    // console.log(req.body)

    try {
        const { authorization } = req.headers;
        const result = await insertTransaction({ ...req.body, userId: authorization });
        // console.log(result);
        result?._id
            ? res.json({
                status: "success",
                message: "Transaction Added",
            })
            : res.json({
                status: "error",
                message: "Transaction Addition Failed",
            });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
});

/* update transactions */
router.patch("/", async (req, res) => {
    try {
        // console.log(req.body)
        const result = await updateTransaction(req.body.id, req.body);
        result?._id
            ? res.json({
                status: "success",
                message: "Your transaction has been updated",
            })
            : res.json({
                status: "error",
                message: "Your transaction could not be updated",
            });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Something went wrong in server. Please contact the provider.",
        });
    }
});

/*delete transactions*/
router.delete("/", async (req, res) => {
    try {
        // console.log(req.body);
        const { authorization } = req.headers;
        console.log(authorization)
        console.log(req.body)
        const result = await deleteUserTransaction(authorization, req.body);
        // console.log(result);
        result?.acknowledged
            ? res.json({
                status: "success",
                message: "Your Transactions has been deleted",
            })
            : res.json({
                status: "error",
                message: "Your Transactions could not be deleted",
            });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Something went wrong in server. Please contact the provider.",
        });
    }
});

export default router;