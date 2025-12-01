import express from 'express';
import Property from '../models/Property.js';

const router = express.Router();

// Create a new property

router.post("/", async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(200).json({ success: true, property });   // ← must be .json()
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});





// Get all properties 

router.get('/' , async (req,res,next) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Get single property by id.
router.get('/:id',async (req,res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({message: "Property not found"});
        }
        res.json(property);
    } catch (err) {
        console.error("Error fetching property:", err);
        res.status(500).json({message: "Server error"});
    }

});

// update properties
router.put('/', async (req,res,next) => {
    try {
        const updated = await Property.findByIdAndUpdate(req.body._id, req.body, {new: true});
        res.json(updated);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// delete property
router.delete('/:id', async (req,res) => {
    try {
        await Property.findByIdAndDelete(req.params.id);
        res.json({message: "Property deleted successfully"});

    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

export default router;
