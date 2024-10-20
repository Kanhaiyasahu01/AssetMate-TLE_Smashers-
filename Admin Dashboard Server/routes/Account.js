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
    getAllClientTransaction,
    getAllSupplierTransaction,
    deleteClientTransaction,
    deleteSupplierTransaction

} = require("../controllers/accounts")


router.post('/create',createAccount);

router.put('/update/:accountId',updateAccount);

router.get('/get-all-accounts',getAllAccounts);

router.get('/get-account/:accountId',getAccountById);

router.delete('/delete/:accountId',deleteAccount);

router.post('/create-transaction', createTransaction);

router.get('/client-transactions',getAllClientTransaction);

router.get('/supplier-transactions',getAllSupplierTransaction);

router.delete('/delete-client-transaction/:transactionId',deleteClientTransaction);
router.delete('/delete-supplier-transaction/:transactionId',deleteSupplierTransaction);
module.exports = router;
