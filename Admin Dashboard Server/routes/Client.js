const express = require("express");
const router = express.Router();


const {
    createClient,
    createClientOrder,
    createQuotation,
    convertToOrder,
    getAllClients,
    getQuotation
}  = require("../controllers/Client")
// import middlewares
const { auth , isAdmin } = require("../middlewares/auth")
// create request
router.post('/create',auth,isAdmin,createClient);

router.post("/create-client-order",auth,isAdmin,createClientOrder);

router.post("/create-quotation",auth,isAdmin,createQuotation);

router.put("/convert-to-order",auth,isAdmin,convertToOrder);

router.get('/get-all-clients',auth,isAdmin,getAllClients);

router.get('/get-client-order/:id',auth,isAdmin,getQuotation);

module.exports = router;
