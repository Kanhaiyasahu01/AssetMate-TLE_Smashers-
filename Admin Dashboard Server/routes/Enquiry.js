const express = require("express");
const router = express.Router();
const {auth,isAdmin} = require("../middlewares/auth")

const {createEnquiry,
    updateEnquiry,
    getAllEnquiries,
    getEnquiry
} = require("../controllers/Enquiry");


router.post('/create',auth,isAdmin,createEnquiry);

router.put('/update/:id',auth,isAdmin,updateEnquiry);

router.get('/all-enqueries' , auth,isAdmin,getAllEnquiries);

router.get('/get-enquiry/:id',auth,isAdmin,getEnquiry);

module.exports = router;