const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;

// Metal name translation from Chinese to English
const metalNameTranslation = {
    "LME锡": "LME Tin",
    "LME铜": "LME Copper",
    "LME铝": "LME Aluminum",
    "LME锌": "LME Zinc",
    "LME铅": "LME Lead",
    "LME镍": "LME Nickel",
    "LME合金":"LME Alloy"

};   

app.get('/api/lme-metal-data', async (req, res) => {
    try {
        const url = 'https://quote.fx678.com/exchange/LME'; // Source URL
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const metals = [];

        $('table tr').each((index, element) => {
            if (index === 0) return; // Skip the header row

            const row = {};
            $(element).find('td').each((i, el) => {
                const cellText = $(el).text().trim();

                // Dynamically assign fields based on column index
                if (i === 0) {
                    const metalNameInChinese = cellText;
                    // Translate metal name to English using the mapping
                    row['name'] = metalNameTranslation[metalNameInChinese] || metalNameInChinese;
                }
                if (i === 1) row['latestPrice'] = cellText;     // Latest Price
                if (i === 2) row['riseFall'] = cellText; 
                if (i === 3) row['risefall'] = cellText;        // Rise and Fall
                if (i === 4) row['highest'] = cellText;         // Highest Price
                if (i === 5) row['lowest'] = cellText;// Yesterday's Harvest
                if (i === 6) row['yesterdayHarvest'] = cellText;  
                if (i === 7) row['updateTime'] = cellText;     // Update Time
            });

            // Only add to result if there's valid data for the metal
            if (Object.keys(row).length > 0) {
                metals.push(row);
            }
        });

        // Return the scraped metal data as JSON
        res.json(metals);
    } catch (error) {
        console.error('Error scraping data:', error);
        res.status(500).json({ error: 'Error scraping data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
