const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Replit Database
let Database;
let db;

try {
    Database = require('@replit/database');
    db = new Database();
    console.log('✅ Using Replit Database');
} catch (err) {
    console.log('⚠️  Using memory storage');
    db = null;
}

let memoryData = {};

async function readData() {
    if (db) {
        try {
            const data = await db.get('inventories');
            return data || {};
        } catch (error) {
            return {};
        }
    } else {
        return memoryData;
    }
}

async function writeData(data) {
    if (db) {
        try {
            await db.set('inventories', data);
            return true;
        } catch (error) {
            return false;
        }
    } else {
        memoryData = data;
        return true;
    }
}

app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'TrackStats API is running!'
    });
});

app.post('/api/update-inventory', async (req, res) => {
    const { username, type, legendaryFishBait, legendaryFruitChest, mythicalFruitChest } = req.body;
    
    if (!username) {
        return res.status(400).json({ success: false, message: 'Username required' });
    }
    
    const allData = await readData();
    
    allData[username] = {
        username,
        type: type || 'treo bf',
        legendaryFishBait: legendaryFishBait || 0,
        legendaryFruitChest: legendaryFruitChest || 0,
        mythicalFruitChest: mythicalFruitChest || 0,
        listClass: '-',
        lastUpdated: new Date().toISOString(),
        isOnline: true
    };
    
    if (await writeData(allData)) {
        console.log(`✅ Updated: ${username}`);
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

app.get('/api/all-inventoriesF', async (req, res) => {
    const allData = await readData();
    const accounts = Object.values(allData).map((acc, index) => ({
        id: index + 1,
        ...acc
    }));
    
    res.json({ success: true, data: accounts });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});