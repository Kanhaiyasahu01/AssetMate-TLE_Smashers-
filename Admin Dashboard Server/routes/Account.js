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


router.post('/create',auth,isAdmin,createAccount);

router.put('/update/:accountId',auth,isAdmin,updateAccount);

router.get('/get-all-accounts',auth,isAdmin,getAllAccounts);

router.get('/get-account/:accountId',auth,isAdmin,getAccountById);

router.delete('/delete/:accountId',auth,isAdmin,deleteAccount);

router.post('/create-transaction', auth,isAdmin,createTransaction);

router.get('/client-transactions',auth,isAdmin,getAllClientTransaction);

router.get('/supplier-transactions',auth,isAdmin,getAllSupplierTransaction);

router.delete('/delete-client-transaction/:transactionId',auth,isAdmin,deleteClientTransaction);
router.delete('/delete-supplier-transaction/:transactionId',auth,isAdmin,deleteSupplierTransaction);
module.exports = router;
