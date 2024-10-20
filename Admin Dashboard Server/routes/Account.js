const express = require("express");
const router = express.Router();
const {auth,isAdmin} = require("../middlewares/auth")

const {
    createAccount,
    updateAccount,
    getAllAccounts,
    getAccountById,
    deleteAccount,
    createTransaction,

} = require("../controllers/accounts")


router.post('/create',createAccount);

router.put('/update/:accountId',updateAccount);

router.get('/get-all-accounts',getAllAccounts);

router.get('/get-account/:accountId',getAccountById);

router.delete('/delete/:accountId',deleteAccount);

router.post('/create-transaction', createTransaction);

module.exports = router;
