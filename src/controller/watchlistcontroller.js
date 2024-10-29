const Watchlist = require('../model/watchlist.model'); // Update with the actual path to your model
const Registration = require('../model/user.model'); // Update with the actual path to your model
const BaseMetal = require('../model/basemetal.model');
 //
 exports.addWatchlistEntry = async (req, res) => {
    const { email, baseMetalId } = req.body; // Extract email and baseMetalId from request body
    console.log('Request Body:', req.body); 
    console.log('Extracted Email:', email); // Log the email directly from the request body

    try {
        // Find the user by email
        const user = await Registration.findOne({ email });
        
        console.log('User Lookup Result:', user); // Log the user object found
        if (!user) {
            console.warn('No user found with the provided email:', email); // Log warning if user is not found
            return res.status(404).json({ message: 'User not found.' });
        }

        // If the user is found, log their email
        console.log('User Email:', user.email); // Check the user's email
        
        // Find the base metal by ID
        const baseMetal = await BaseMetal.findById(baseMetalId);
        if (!baseMetal) {
            console.warn('Base metal not found for ID:', baseMetalId); // Log warning if base metal is not found
            return res.status(404).json({ message: 'Base metal not found.' });
        }
        console.log('Base Metal Found:', baseMetal); // Log the base metal object found

        // Add baseMetalId to the user's watchlist or create a new watchlist entry if none exists
        const updatedWatchlist = await Watchlist.findOneAndUpdate(
            { email }, // Find by email
            { $addToSet: { baseMetalIds: baseMetal._id } }, // Add baseMetalId to array if not already present
            { new: true, upsert: true } // Create new entry if none exists
        );

        // Send a response with the updated watchlist entry
        res.status(201).json({
            message: 'Watchlist entry updated successfully',
            updatedWatchlist: {
                _id: updatedWatchlist._id,
                baseMetalIds: updatedWatchlist.baseMetalIds,
                email: updatedWatchlist.email,
                createdAt: updatedWatchlist.createdAt,
            }
        });
    } catch (error) {
        console.error('Error adding to watchlist:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error adding to watchlist.' });
    }
};











exports.getWatchlist = async (req, res) => {
    const { email } = req.query; // Extract email from query parameters

    try {
        // Find the user by email
        const user = await Registration.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Find all watchlist entries for this user
        const watchlistEntries = await Watchlist.find({ email: user._id })
            .populate('baseMetalId') // Populate base metal details
            .exec();

        // Extract only base metal details
        const baseMetalList = watchlistEntries.map(entry => entry.baseMetalId);

        res.status(200).json({
            message: 'Watchlist retrieved successfully',
            baseMetal: baseMetalList, // Return base metals directly as an array
        });
    } catch (error) {
        console.error('Error retrieving watchlist:', error);
        res.status(500).json({ message: 'Error retrieving watchlist.' });
    }
};



// 2. Get a user's watchlist with baseMetal in array format
exports.getWatchlist = async (req, res) => {
    const { email } = req.query; // Extract email from query parameters

    try {
        // Validate the email
        if (!email) {
            return res.status(400).json({ message: 'Email is required.' });
        }

        // Find the user by email
        const user = await Registration.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Find the user's watchlist entry by email
        const watchlistEntry = await Watchlist.findOne({ email })
            .populate('baseMetalIds') // Populate details for each baseMetalId in the array
            .exec();

        // Check if a watchlist entry exists
        if (!watchlistEntry) {
            return res.status(404).json({ message: 'No watchlist found for the user.' });
        }

        // Extract populated base metal details
        const baseMetalList = watchlistEntry.baseMetalIds;

        res.status(200).json({
            message: 'Watchlist retrieved successfully',
            baseMetals: baseMetalList, // Return base metals directly as an array
        });
    } catch (error) {
        console.error('Error retrieving watchlist:', error);
        res.status(500).json({ message: 'Error retrieving watchlist.' });
    }
};


exports.deleteWatchListById = async (req, res) => {
    try {
        const { id, email } = req.query; // Get the baseMetalId and email from query parameters

        // Validate the baseMetalId
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Base metal ID is required.",
            });
        }

        // Validate the email
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required.",
            });
        }

        // Find the user by email
        const user = await Registration.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Find and update the watchlist, removing the specified baseMetalId from the baseMetalIds array
        const updatedWatchlist = await Watchlist.findOneAndUpdate(
            { email },
            { $pull: { baseMetalIds: id } }, // Remove the specified baseMetalId from the array
            { new: true } // Return the updated document
        );

        // Check if the baseMetalId was removed from the watchlist
        if (!updatedWatchlist || updatedWatchlist.baseMetalIds.length === 0) {
            return res.status(200).json({
                success: false,
                message: "Watchlist entry empty.",
            });
        }

        // Respond with success message
        res.status(200).json({
            success: true,
            message: "Base metal removed from watchlist successfully.",
            data: updatedWatchlist,
        });
    } catch (error) {
        // Handle any errors during deletion
        res.status(500).json({
            success: false,
            message: "Error removing base metal from watchlist.",
            error: error.message,
        });
    }
};




