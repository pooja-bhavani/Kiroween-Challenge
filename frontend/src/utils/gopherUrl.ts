import { GopherUrl } from '../types';

/**
 * Parse a Gopher URL string into components
 * Format: gopher://host:port/type/selector
 */
export function parseGopherUrl(url: string): GopherUrl {
  // Handle gopher:// protocol
  if (!url.startsWith('gopher://')) {
    throw new Error('Invalid Gopher URL: must start with gopher://');
  }

  const withoutProtocol = url.substring(9); // Remove 'gopher://'
  
  // Split into host:port and path
  const firstSlash = withoutProtocol.indexOf('/');
  const hostPort = firstSlash === -1 ? withoutProtocol : withoutProtocol.substring(0, firstSlash);
  const path = firstSlash === -1 ? '' : withoutProtocol.substring(firstSlash);

  // Parse host and port
  const colonIndex = hostPort.indexOf(':');
  const host = colonIndex === -1 ? hostPort : hostPort.substring(0, colonIndex);
  const port = colonIndex === -1 ? 70 : parseInt(hostPort.substring(colonIndex + 1), 10);

  if (!host) {
    throw new Error('Invalid Gopher URL: missing host');
  }

  if (isNaN(port) || port < 1 || port > 65535) {
    throw new Error('Invalid Gopher URL: invalid port');
  }

  // Parse item type and selector
  let itemType = '1'; // Default to directory
  let selector = '';

  if (path.length > 1) {
    itemType = path[1]; // Character after first /
    selector = path.substring(2); // Everything after /type
  }

  return {
    protocol: 'gopher',
    host,
    port,
    itemType,
    selector
  };
}

/**
 * Build a Gopher URL string from components
 */
export function buildGopherUrl(parts: GopherUrl): string {
  const portStr = parts.port === 70 ? '' : `:${parts.port}`;
  return `gopher://${parts.host}${portStr}/${parts.itemType}${parts.selector}`;
}

/**
 * Build a Gopher URL from a menu item
 */
export function buildGopherUrlFromItem(item: GopherMenuItem): string {
  return buildGopherUrl({
    protocol: 'gopher',
    host: item.host,
    port: item.port,
    itemType: item.type,
    selector: item.selector
  });
}
