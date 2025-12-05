import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { GopherClient } from '../../backend/src/GopherClient.js';
import { GopherParser } from '../../backend/src/GopherParser.js';

const gopherClient = new GopherClient();
const gopherParser = new GopherParser();

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      },
      body: ''
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { host, port: portStr, selector, search } = event.queryStringParameters || {};

    // Validate required parameters
    if (!host || typeof host !== 'string') {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Missing or invalid host parameter' })
      };
    }

    // Parse port (default to 70)
    const port = portStr ? parseInt(portStr, 10) : 70;
    if (isNaN(port) || port < 1 || port > 65535) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Invalid port number' })
      };
    }

    // Selector defaults to empty string
    const selectorStr = selector || '';
    const searchQuery = search || undefined;

    // Fetch from Gopher server
    const response = await gopherClient.fetch({
      host,
      port,
      selector: selectorStr,
      searchQuery
    });

    // Check for errors
    if (response.error) {
      return {
        statusCode: 503,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: response.error })
      };
    }

    // Parse the content
    const parsed = gopherParser.parse(response.content);

    // Return parsed content
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        ...parsed
      })
    };

  } catch (error) {
    console.error('Error in gopher function:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
