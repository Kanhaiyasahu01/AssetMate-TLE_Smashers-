const express = require("express");
const router = express.Router();
const {auth,isAdmin} = require("../middlewares/auth")

const {createEnquiry,
    updateEnquiry,
    getAllEnquiries,
    getEnquiry
} = require("../controllers/Enquiry");


router.post('/create',createEnquiry);

router.put('/update/:id',updateEnquiry);

router.get('/all-enqueries' , getAllEnquiries);

router.get('/get-enquiry/:id',getEnquiry);

module.exports = router;