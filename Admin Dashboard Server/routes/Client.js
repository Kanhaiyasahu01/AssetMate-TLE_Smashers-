const express = require("express");
const router = express.Router();


const {
    createClient,
    createClientOrder,
    createQuotation,
    convertToOrder,
    getAllClients,
    getQuotation,
    getOrder,
    fetchAllOrder,
    deleteOrderById,
    fetchAllQuotation,
    deleteClients
}  = require("../controllers/Client")


// import middlewares
const { auth , isAdmin } = require("../middlewares/auth");
// create request
router.post('/create',createClient);

router.post("/create-client-order",createClientOrder);

router.post("/create-quotation",createQuotation);

router.put("/convert-to-order",convertToOrder);

router.get('/get-all-clients',getAllClients);

router.get('/get-client-order/:id',getQuotation);

router.get('/get-client-invoice/:id',getOrder);

router.get('/get-all-orders',fetchAllOrder);

router.get('/get-all-quotation',fetchAllQuotation);

router.delete('/delete-order',deleteOrderById);

router.delete('/delete-client',deleteClients);
module.exports = router;
