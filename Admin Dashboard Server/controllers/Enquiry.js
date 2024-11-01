const Enquiry = require("../models/Enquiry");

exports.createEnquiry = async (req, res) => {
    try {
      const { plantName, contactPerson, materialRequired, termsAndConditions, note } = req.body;
  
      const newEnquiry = new Enquiry({
        plantName,
        contactPerson,
        materialRequired,
        termsAndConditions,
        note,
      });
  
      await newEnquiry.save();
      res.status(201).json({ success:true,message: 'Enquiry created successfully', enquiry: newEnquiry });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create enquiry', details: error.message });
    }
  };
  

  exports.updateEnquiry = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, updatedData, { new: true });
      if (!updatedEnquiry) {
        return res.status(404).json({ error: 'Enquiry not found' });
      }
  
      res.status(200).json({
        success:true, message: 'Enquiry updated successfully', enquiry: updatedEnquiry });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update enquiry', details: error.message });
    }
  };
  
  // Get all enquiries
  exports.getAllEnquiries = async (req, res) => {
    try {
      const enquiries = await Enquiry.find({});
      res.status(200).json(
        {
            success:true,
            enquiries
        }
      );
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve enquiries', details: error.message });
    }
  };
  
  exports.getEnquiry = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find the enquiry by ID
        const enquiry = await Enquiry.findById(id);
        
        // Check if the enquiry was found
        if (!enquiry) {
            return res.status(404).json({ 
                success: false,
                message: 'Enquiry not found' 
            });
        }

        // Send the enquiry data in the response
        res.status(200).json({
            success: true,
            message: "Enquiry fetched successfully",
            enquiry
        });
    } catch (error) {
        // Handle any errors that occur
        console.error('Error fetching enquiry:', error);
        res.status(500).json({ 
            success: false,
            message: 'An error occurred while fetching the enquiry' 
        });
    }
};
