const express = require('express');

const mongoose = require('mongoose');
const userRoutes=require('./src/route/lmescrap')

// Importing Metal model

const app = express();
const PORT = process.env.PORT || 3001;
app.use('/api', userRoutes);
// MongoDB connection
mongoose.connect('mongodb+srv://Rahul:myuser@rahul.fack9.mongodb.net/LMESCRAP?authSource=admin&replicaSet=atlas-117kuv-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.error("MongoDB connection error:", error));

// Metal name translation from Chinese to English




// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
