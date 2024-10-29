const mongoose = require('mongoose');

// Define possible values for each key
const cities = [
    'DELHI', 'MUMBAI', 'AHMEDABAD', 'HYDERABAD', 'PUNE', 
    'CHENNAI', 'JODHPUR', 'JAGADHRI', 'MORADABAD', 'JALANDHAR', 
    'KOLKATA', 'JAMNAGAR'
];

const categories = [
    "COPPER", "BRASS", "ALUMINIUM", "GUNMETAL", "ZINC", 
    "LEAD", "NICKEL CATHODE", "TIN", "STEEL"
];

const types = [
    "SCRAP", "ROD", "INGOT"
];

const subcategories = [
    "ALUMINIUM BARTAN",
    "AUSTRALIA (AZ)",
    "ALUMINIUM CABLE WIRE",
    "ALUMINIUM OVERHEAD WIRE",
    "ALUMINIUM PURJA",
    "ALUMINIUM SECTION",
    "ALUMINIUM ALLOY",
    "ALUMINIUM SOFT SHEET SCRAP",
    "ANGEL",
    "BEER CAN",
    "BARTAN",
    "WIRE SCRAP",
    "BHARAT",
    "BRASS",
    "BRASS (PITAL)",
    "BRASS HONEY",
    "BRASS INGOT",
    "BRASS PURJA",
    "BRASS VILAITY",
    "BHATTHI",
    "CASTING PURJA",
    "CHADRI",
    "CHALU",
    "IRANI (IZ)",
    "COPPER ARM",
    "COPPER ARM (CREDIT)",
    "COPPER CCR",
    "COPPER KALIYA",
    "COPPER LAL",
    "COPPER UTENSILS SCRAP",
    "COMPANY INGOT",
    "COMPANY ROD",
    "LOCAL ROD",
    "CC ROD",
    "CCR ROD",
    "DHAANA TUKADI",
    "DHADA",
    "DIE-CAST (PURJA)",
    "DELHI RASA",
    "DROSS",
    "GUN METAL",
    "GUN METAL (MIX)",
    "HIGH PLAIN",
    "HZL",
    "HONEY",
    "HONEY EUROPE/U.K",
    "HONEY GULF",
    "JINCHUAN",
    "IMP",
    "INDO (LOOSE )",
    "INDO(MIN 1 TON )",
    "INDIA (HZL)",
    "IMPORTED (JAPAN)",
    "JALI PATTI/HEAVY SCRAP",
    "JALANDHAR",
    "LME BRAND",
    "LOCAL",
    "BATT (B/W)",
    "PP",
    "MIX",
    "MIX BHATOR",
    "PLANT",
    "PMI",
    "PITAL BARTAN",
    "PURJA",
    "PURJA ENGINE PART",
    "RADIATOR",
    "RUSSIAN",
    "NORWAY",
    "REDI JALI",
    "SCRAP",
    "SCRAP (ARM)",
    "SS MIX",
    "SMALL TUKADI",
    "SUPER D",
    "TAMBA BARTAN",
    "TUKADI",
    "TUKADI (BIG)",
    "TUKADI (MIX)",
    "ZAMAK-3",
    "ZAMAK 5",
    "ZERO",
    "ZINC DROSS",
    "ZINC HZL",
    "ZINC PLANT PASS",
    "ZINC PURJA",
    "ZINC INGOT (HZL)",
    "ZINC INGOT (KZ)"
];

// Define the schema
const ItemSchema = new mongoose.Schema({
    city: {
        type: String,
        enum: cities,
        required: true
    },
    category: {
        type: String,
        enum: categories,
        required: true
    },
    type: {
        type: String,
        enum: types,
        required: true
    },
    subcategory: {
        type: String,
        enum: subcategories,
        required: true
    },
    price: {
        type: String,
        required: true,
        default:0
    },
    lastPrice:{
        type:String,
        default:0
    },
    percentageChange:{
        type:String,
        default:0
    },
    incrementPrice: {
        type: String,
        default:0
      },
    }, {
      timestamps: true
    });

// Create the model
const Item = mongoose.model('BaseMetal', ItemSchema);

module.exports = Item;
