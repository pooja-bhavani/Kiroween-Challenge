import * as net from 'net';
import { GopherRequest, GopherResponse } from './types.js';

export class GopherClient {
  private readonly timeout: number = 10000; // 10 seconds

  async fetch(request: GopherRequest): Promise<GopherResponse> {
    return new Promise((resolve) => {
      const socket = new net.Socket();
      let data = '';
      let hasError = false;

      // Set timeout
      socket.setTimeout(this.timeout);

      socket.on('timeout', () => {
        hasError = true;
        socket.destroy();
        resolve({
          content: '',
          error: 'Connection timeout: Server did not respond within 10 seconds'
        });
      });

      socket.on('error', (err: NodeJS.ErrnoException) => {
        if (hasError) return; // Already handled
        hasError = true;
        
        let errorMessage = 'Connection failed';
        if (err.code === 'ENOTFOUND') {
          errorMessage = 'Server not found: Unable to resolve hostname';
        } else if (err.code === 'ECONNREFUSED') {
          errorMessage = 'Connection refused: Server is not accepting connections';
        } else if (err.code === 'ETIMEDOUT') {
          errorMessage = 'Connection timeout: Unable to reach server';
        } else {
          errorMessage = `Connection error: ${err.message}`;
        }
        
        resolve({
          content: '',
          error: errorMessage
        });
      });

      socket.on('data', (chunk: Buffer) => {
        data += chunk.toString('utf-8');
      });

      socket.on('end', () => {
        if (!hasError) {
          resolve({
            content: data
          });
        }
      });

      socket.on('close', () => {
        if (!hasError && data === '') {
          resolve({
            content: '',
            error: 'Connection closed: No data received'
          });
        }
      });

      // Connect and send request
      socket.connect(request.port, request.host, () => {
        // Format: selector[TAB]searchQuery\r\n or just selector\r\n
        let requestStr = request.selector;
        if (request.searchQuery) {
          requestStr += '\t' + request.searchQuery;
        }
        requestStr += '\r\n';
        
        socket.write(requestStr);
      });
    });
  }
}
