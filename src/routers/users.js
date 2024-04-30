import express from 'express'
import { insertUser, getUsers, updateUser, deleteUser, getUserByEmail } from '../model/user/UserModel.js'
import { comparePassword, hashPassword } from '../utils/bcryptjs.js';

const router = express.Router()

/* GET*/
router.get("/", async (req, res) => {
    const result = await getUsers();
    console.log(result);
    res.json({
        message: "User List read",
        data: result,
    });
});

/* POST*/
router.post("/", async (req, res) => {
    // console.log(req.body)
    try {
        req.body.password = hashPassword(req.body.password);
        const result = await insertUser(req.body);
        // console.log(result);
        result?._id
            ? res.json({
                status: "success",
                message: "User Added",
            })
            : res.json({
                status: "error",
                message: "User Addition Failed",
            });
    } catch (error) {
        console.log(error)
        let code = 500;
        if (error.message.includes('E11000 duplicate key error')) {
            code = 200;
            error.message = 'There is already another account associated to this email. Use different email to sign up.'
        }
        res.status(code).json({
            status: "error",
            message: error.message,
        });
    }
});

/* POST*/
router.post("/login", async (req, res) => {
    // console.log(req.body)
    try {
        const user = await getUserByEmail(req.body.email);
        // console.log(result);
        if (user?._id) {
            const isMatch = comparePassword(req.body.password, user.password);
            if (isMatch) {
                user.password = undefined;
                return res.json({
                    status: 'success',
                    message: 'Login Successfull!!!!',
                    user
                })
            }
            return res.json({
                status: 'error',
                message: 'Invalid Credential!!!!'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
});

/*update task*/
router.patch("/", async (req, res) => {
    try {
        // console.log(req.body)
        const result = await updateUser(req.body.id, req.body);
        result?._id
            ? res.json({
                status: "success",
                message: "Your user has been updated",
            })
            : res.json({
                status: "error",
                message: "Your user could not be updated",
            });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Something went wrong in server. Please contact the provider.",
        });
    }
});

/*delete task*/
router.delete("/", async (req, res) => {
    try {
        console.log(req.body);
        const { ids } = req.body;
        const result = await deleteUser(ids);
        console.log(result);
        result?.acknowledged
            ? res.json({
                status: "success",
                message: "Your User has been deleted",
            })
            : res.json({
                status: "error",
                message: "Your User could not be deleted",
            });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Something went wrong in server. Please contact the provider.",
        });
    }
});

export default router;