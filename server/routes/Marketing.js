const express = require("express");
const router = express.Router();
const {auth,isAdmin} = require("../middlewares/auth")


const {
    addQuotation,
    getMarketingUsers,
    getMarketingQuotations
} = require("../controllers/marketing")

router.put('/add-quotation',auth,addQuotation);

router.get('/get-users',auth,getMarketingUsers);

router.get('/get-all-quotations',auth,getMarketingQuotations);


module.exports = router;