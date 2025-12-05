import { GopherMenuItem, ParsedGopherContent } from './types.js';

export class GopherParser {
  /**
   * Parse Gopher response content
   */
  parse(rawContent: string): ParsedGopherContent {
    if (!rawContent || rawContent.trim() === '') {
      return {
        isMenu: false,
        text: ''
      };
    }

    // Check if this looks like a Gopher menu
    if (this.isGopherMenu(rawContent)) {
      const items = this.parseMenu(rawContent);
      return {
        isMenu: true,
        items
      };
    }

    // It's plain text
    return {
      isMenu: false,
      text: rawContent
    };
  }

  /**
   * Determine if content is a Gopher menu
   * Menus have lines starting with a type character followed by display text
   */
  isGopherMenu(content: string): boolean {
    const lines = content.split('\n');
    let menuLineCount = 0;
    let totalLines = 0;

    for (const line of lines) {
      if (line.trim() === '' || line === '.') continue;
      totalLines++;

      // Check if line matches Gopher menu format
      // Format: Type + Display + TAB + Selector + TAB + Host + TAB + Port
      if (line.length > 0 && line.includes('\t')) {
        const type = line[0];
        // Valid Gopher item types
        if ('0123456789+gIThis'.includes(type)) {
          menuLineCount++;
        }
      }
    }

    // If more than 50% of lines look like menu items, it's probably a menu
    return totalLines > 0 && (menuLineCount / totalLines) > 0.5;
  }

  /**
   * Parse Gopher menu into structured items
   */
  private parseMenu(content: string): GopherMenuItem[] {
    const items: GopherMenuItem[] = [];
    const lines = content.split('\n');

    for (const line of lines) {
      // Skip empty lines and terminator
      if (line.trim() === '' || line === '.') continue;

      const item = this.parseMenuItem(line);
      if (item) {
        items.push(item);
      }
    }

    return items;
  }

  /**
   * Parse a single menu item line
   * Format: Type + Display + TAB + Selector + TAB + Host + TAB + Port
   */
  private parseMenuItem(line: string): GopherMenuItem | null {
    if (line.length === 0) return null;

    const type = line[0];
    const rest = line.substring(1);
    const parts = rest.split('\t');

    // Need at least display text
    if (parts.length < 1) return null;

    const display = parts[0] || '';
    const selector = parts[1] || '';
    const host = parts[2] || '';
    const portStr = parts[3] || '70';
    const port = parseInt(portStr, 10) || 70;

    return {
      type,
      display,
      selector,
      host,
      port
    };
  }

  /**
   * Serialize a menu item back to RFC 1436 format
   */
  serializeMenuItem(item: GopherMenuItem): string {
    return `${item.type}${item.display}\t${item.selector}\t${item.host}\t${item.port}`;
  }

  /**
   * Serialize a full menu to RFC 1436 format
   */
  serializeMenu(items: GopherMenuItem[]): string {
    return items.map(item => this.serializeMenuItem(item)).join('\n') + '\n.';
  }
}
