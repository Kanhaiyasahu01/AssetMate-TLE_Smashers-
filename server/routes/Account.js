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


router.post('/create',auth,createAccount);

router.put('/update/:accountId',auth,updateAccount);

router.get('/get-all-accounts',auth,getAllAccounts);

router.get('/get-account/:accountId',auth,getAccountById);

router.delete('/delete/:accountId',auth,deleteAccount);

router.post('/create-transaction', auth,createTransaction);

router.get('/client-transactions',auth,getAllClientTransaction);

router.get('/supplier-transactions',auth,getAllSupplierTransaction);

router.delete('/delete-client-transaction/:transactionId',auth,deleteClientTransaction);
router.delete('/delete-supplier-transaction/:transactionId',auth,deleteSupplierTransaction);
module.exports = router;
