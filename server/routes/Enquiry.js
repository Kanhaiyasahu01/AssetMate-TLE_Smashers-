const express = require("express");
const router = express.Router();
const {auth,isAdmin} = require("../middlewares/auth")

const {createEnquiry,
    updateEnquiry,
    getAllEnquiries,
    getEnquiry
} = require("../controllers/Enquiry");


router.post('/create',auth,createEnquiry);

router.put('/update/:id',auth,updateEnquiry);

router.get('/all-enqueries' , auth,getAllEnquiries);

router.get('/get-enquiry/:id',auth,getEnquiry);

module.exports = router;