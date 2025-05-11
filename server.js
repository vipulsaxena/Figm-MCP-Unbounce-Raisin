import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from '../dist/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create Express app
const app = express();

// Create MCP server instance with isHTTP=false to prevent double initialization
const mcpServer = createServer(process.env.FIGMA_API_KEY, { isHTTP: false });

// Serve static files
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint to fetch Figma data
app.get('/api/figma', async (req, res) => {
    try {
        const { fileKey, nodeId } = req.query;
        if (!fileKey) {
            return res.status(400).json({ error: 'File key is required' });
        }

        // Use the MCP server to fetch Figma data
        const result = await mcpServer.tool('get_figma_data', {
            fileKey,
            nodeId
        });

        res.json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
