const express = require('express');
const router = express.Router();



const {createTerms,getTerm,updateTerms,deleteTerms,getAllTerms} = require('../controllers/terms');

// CRUD routes for Terms
router.post('/create-terms', createTerms); // Create terms
router.get('/terms/get',getTerm); // Get specific terms by ID
router.put('/terms/:id', updateTerms); // Update specific terms by ID
router.delete('/terms/:id',deleteTerms); // Delete specific terms by ID

module.exports = router;
