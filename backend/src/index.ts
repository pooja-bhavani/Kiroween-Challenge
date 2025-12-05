import express from 'express';
import cors from 'cors';
import { GopherClient } from './GopherClient.js';
import { GopherParser } from './GopherParser.js';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gopher client and parser
const gopherClient = new GopherClient();
const gopherParser = new GopherParser();

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Main Gopher proxy endpoint
app.get('/api/gopher', async (req, res) => {
  try {
    const { host, port: portStr, selector, search } = req.query;

    // Validate required parameters
    if (!host || typeof host !== 'string') {
      return res.status(400).json({
        error: 'Missing or invalid host parameter'
      });
    }

    // Parse port (default to 70)
    const port = portStr ? parseInt(portStr as string, 10) : 70;
    if (isNaN(port) || port < 1 || port > 65535) {
      return res.status(400).json({
        error: 'Invalid port number'
      });
    }

    // Selector defaults to empty string
    const selectorStr = (selector as string) || '';
    const searchQuery = search ? (search as string) : undefined;

    // Fetch from Gopher server
    const response = await gopherClient.fetch({
      host,
      port,
      selector: selectorStr,
      searchQuery
    });

    // Check for errors
    if (response.error) {
      return res.status(503).json({
        error: response.error
      });
    }

    // Parse the content
    const parsed = gopherParser.parse(response.content);

    // Return parsed content
    res.json({
      success: true,
      ...parsed
    });

  } catch (error) {
    console.error('Error in /api/gopher:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Gopher Browser backend running on port ${port}`);
  console.log(`📡 API endpoint: http://localhost:${port}/api/gopher`);
});
