// src/controllers/metal.controller.js
const axios = require('axios');
const cheerio = require('cheerio');


const baseMetal = require('../model/basemetal.model');
const lmescrapwatchlist = require('../model/lmescrapwatchlist.model');
const user = require('../model/user.model');
const watchlist = require('../model/watchlist.model');

const metalNameTranslation = {
    "LME锡": "LME Tin",
    "LME铜": "LME Copper",
    "LME铝": "LME Aluminum",
    "LME锌": "LME Zinc",
    "LME铅": "LME Lead",
    "LME镍": "LME Nickel",
    "LME合金": "LME Alloy"
};

const moment = require('moment-timezone');

exports.getMetalData = async (req, res) => {
    try {
        const url = 'https://quote.fx678.com/exchange/LME';
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const metalUpdates = [];

        $('table tr').each((index, element) => {
            if (index === 0) return; // Skip header row

            const row = {};
            $(element).find('td').each((i, el) => {
                const cellText = $(el).text().trim();
                if (i === 0) {
                    const metalNameInChinese = cellText;
                    row['name'] = metalNameTranslation[metalNameInChinese] || metalNameInChinese;
                }
                if (i === 1) row['latestPrice'] = parseFloat(cellText);
                if (i === 2) row['riseFall'] = parseFloat(cellText);
                if (i === 3) row['risefall'] = cellText;
                if (i === 4) row['highest'] = parseFloat(cellText);
                if (i === 5) row['lowest'] = parseFloat(cellText);
                if (i === 6) row['yesterdayHarvest'] = parseFloat(cellText);
                if (i === 7) {
                    // Combine the current date with the scraped time (China time)
                    const timeOnly = cellText;
                    const chinaTime = moment.tz(`${moment().format('YYYY-MM-DD')} ${timeOnly}`, 'Asia/Shanghai');

                    // Convert to India Standard Time (IST)
                    const istTime = chinaTime.clone().tz('Asia/Kolkata');

                    row['updateTime'] = istTime.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'); // Convert to ISO format
                }
            });

            if (Object.keys(row).length > 0) {
                metalUpdates.push(row);
            }
        });

        if (metalUpdates.length === 0) {
            return res.status(404).json({ error: 'No data found in the table.' });
        }

        // Save or update each metal data in the database
        const updatePromises = metalUpdates.map(metalData =>
            lmescrapwatchlist.findOneAndUpdate(
                { name: metalData.name },
                { $set: metalData },
                { upsert: true, new: true }
            ).catch(error => console.error(`Failed to update ${metalData.name}:`, error))
        );

        await Promise.all(updatePromises);

        const metals = await lmescrapwatchlist.find({});
        res.status(200).json({
            message: 'Metal data updated successfully',
            data: metals
        });
    } catch (error) {
        console.error('Error scraping data:', error);
        res.status(500).json({ error: 'Error scraping data' });
    }
};




