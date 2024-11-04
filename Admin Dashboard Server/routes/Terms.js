const express = require('express');
const router = express.Router();

const {auth,isAdmin}= require("../middlewares/auth")

const {createTerms,getTerm,updateTerms,deleteTerms,getAllTerms} = require('../controllers/terms');

// CRUD routes for Terms
router.post('/create-terms', auth,createTerms); // Create terms
router.get('/terms/get',auth,getTerm); // Get specific terms by ID
router.put('/terms/:id',auth, updateTerms); // Update specific terms by ID
router.delete('/terms/:id',auth,deleteTerms); // Delete specific terms by ID

module.exports = router;
