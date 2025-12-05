# Design Document

## Overview

The Gopher Browser is a modern web application that resurrects the Gopher protocol by providing a contemporary interface to explore Gopherspace. The application consists of a React-based frontend with a Node.js/Express backend that acts as a proxy to handle Gopher protocol connections. The architecture separates concerns between protocol handling, state management, UI rendering, and data persistence, ensuring maintainability and extensibility.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Browser (Client)                     │
│  ┌────────────────────────────────────────────────────┐ │
│  │           React Frontend Application               │ │
│  │  ┌──────────┐  ┌──────────┐  ┌─────────────────┐ │ │
│  │  │   UI     │  │  State   │  │  Local Storage  │ │ │
│  │  │Components│  │Management│  │   (Bookmarks)   │ │ │
│  │  └──────────┘  └──────────┘  └─────────────────┘ │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                          │
                    HTTP/WebSocket
                          │
┌─────────────────────────────────────────────────────────┐
│              Node.js Backend (Proxy Server)             │
│  ┌────────────────────────────────────────────────────┐ │
│  │  ┌──────────────┐  ┌─────────────────────────────┐│ │
│  │  │   Express    │  │   Gopher Protocol Handler   ││ │
│  │  │   Routes     │  │   (TCP Socket Client)       ││ │
│  │  └──────────────┘  └─────────────────────────────┘│ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                          │
                    TCP Connection
                          │
┌─────────────────────────────────────────────────────────┐
│                   Gopher Servers                        │
│              (gopherspace, various hosts)               │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- Vite for build tooling
- CSS Modules for styling
- LocalStorage API for persistence
- Service Worker for PWA functionality

**Backend:**
- Node.js 18+
- Express.js for HTTP server
- Native `net` module for TCP connections
- CORS enabled for development

## Components and Interfaces

### Backend Components

#### 1. GopherClient

Handles raw TCP connections to Gopher servers.

```typescript
interface GopherRequest {
  host: string;
  port: number;
  selector: string;
  searchQuery?: string;
}

interface GopherResponse {
  content: string;
  error?: string;
}

class GopherClient {
  async fetch(request: GopherRequest): Promise<GopherResponse>
}
```

#### 2. GopherParser

Parses Gopher protocol responses into structured data.

```typescript
interface GopherMenuItem {
  type: string;
  display: string;
  selector: string;
  host: string;
  port: number;
}

interface ParsedGopherContent {
  isMenu: boolean;
  items?: GopherMenuItem[];
  text?: string;
}

class GopherParser {
  parse(rawContent: string): ParsedGopherContent
  isGopherMenu(content: string): boolean
}
```

#### 3. Express Routes

```typescript
// GET /api/gopher?host=&port=&selector=&search=
app.get('/api/gopher', async (req, res) => {
  // Fetch from Gopher server and return parsed content
});
```

### Frontend Components

#### 1. GopherBrowser (Main Component)

Root component managing application state and routing.

```typescript
interface GopherBrowserState {
  currentUrl: GopherUrl | null;
  content: ParsedGopherContent | null;
  loading: boolean;
  error: string | null;
  history: HistoryEntry[];
}
```

#### 2. AddressBar

URL input and navigation controls.

```typescript
interface AddressBarProps {
  currentUrl: string;
  onNavigate: (url: string) => void;
  onBack: () => void;
  onBookmark: () => void;
  canGoBack: boolean;
}
```

#### 3. ContentDisplay

Renders Gopher menus or text content.

```typescript
interface ContentDisplayProps {
  content: ParsedGopherContent;
  onNavigate: (item: GopherMenuItem) => void;
}
```

#### 4. BookmarkPanel

Displays and manages bookmarks.

```typescript
interface Bookmark {
  id: string;
  url: string;
  title: string;
  timestamp: number;
}

interface BookmarkPanelProps {
  bookmarks: Bookmark[];
  onNavigate: (url: string) => void;
  onDelete: (id: string) => void;
}
```

#### 5. HistoryPanel

Displays navigation history.

```typescript
interface HistoryEntry {
  url: string;
  title: string;
  timestamp: number;
}

interface HistoryPanelProps {
  history: HistoryEntry[];
  onNavigate: (url: string) => void;
  onClear: () => void;
}
```

#### 6. SearchInput

Input field for Gopher search queries.

```typescript
interface SearchInputProps {
  onSearch: (query: string) => void;
}
```

## Data Models

### GopherUrl

```typescript
interface GopherUrl {
  protocol: 'gopher';
  host: string;
  port: number;
  itemType: string;
  selector: string;
}

function parseGopherUrl(url: string): GopherUrl
function buildGopherUrl(parts: GopherUrl): string
```

### Bookmark

```typescript
interface Bookmark {
  id: string;           // UUID
  url: string;          // Full Gopher URL
  title: string;        // Display name
  timestamp: number;    // Unix timestamp
}
```

### HistoryEntry

```typescript
interface HistoryEntry {
  url: string;
  title: string;
  timestamp: number;
}
```

## Correctness Properties


*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

After analyzing the acceptance criteria, several properties are redundant and can be consolidated:
- Properties 1.2 and 1.3 both test menu parsing and can be combined into a comprehensive parsing property
- Properties 2.2, 2.3, and 2.4 all test navigation behavior and can be unified
- Property 5.3 is covered by the general menu parsing property
- Properties 3.3 and 7.3 both test navigation from saved items

**Property 1: Gopher URL parsing extracts correct connection parameters**
*For any* valid Gopher URL string, parsing should extract the host and port that match the URL's authority component.
**Validates: Requirements 1.1**

**Property 2: Gopher menu round-trip consistency**
*For any* valid Gopher menu structure, serializing to RFC 1436 format then parsing should produce an equivalent menu structure with all fields preserved.
**Validates: Requirements 1.2, 1.3**

**Property 3: Text content preserves line breaks**
*For any* text content with line breaks, rendering and extracting the text should preserve the original line break positions.
**Validates: Requirements 1.4**

**Property 4: Menu items render with type-appropriate icons**
*For any* Gopher menu item, the rendered output should include an icon that corresponds to the item's type code.
**Validates: Requirements 2.1**

**Property 5: Navigation triggers correct resource fetch**
*For any* clickable Gopher menu item (types 0, 1, h), clicking should trigger a fetch request with the item's selector, host, and port.
**Validates: Requirements 2.2, 2.3, 2.4**

**Property 6: History navigation is reversible**
*For any* sequence of navigation actions, using the back button should traverse the history in reverse order.
**Validates: Requirements 2.5**

**Property 7: Bookmark creation captures all required fields**
*For any* Gopher page, creating a bookmark should result in a stored object containing the URL, title, and a valid timestamp.
**Validates: Requirements 3.1**

**Property 8: Bookmarks are sorted by recency**
*For any* set of bookmarks with different timestamps, displaying them should show the most recent bookmark first.
**Validates: Requirements 3.2**

**Property 9: Bookmark deletion removes from storage**
*For any* bookmark in storage, deleting it should result in that bookmark no longer appearing in the stored bookmark list.
**Validates: Requirements 3.4**

**Property 10: Bookmark operations persist to localStorage**
*For any* bookmark operation (add, delete), the localStorage should be updated to reflect the change immediately.
**Validates: Requirements 3.5**

**Property 11: Search queries include tab and CRLF**
*For any* non-empty search query string, the request sent to the Gopher server should contain the query followed by a tab character and CRLF.
**Validates: Requirements 5.2**

**Property 12: All specified item types are recognized**
*For any* menu item with type in {0, 1, 3, 7, 8, 9, g, h, i}, the parser should correctly identify and categorize the item type.
**Validates: Requirements 6.1**

**Property 13: Informational items are non-interactive**
*For any* menu item with type 'i', the rendered output should not include a clickable link or navigation action.
**Validates: Requirements 6.2**

**Property 14: Error items have distinct styling**
*For any* menu item with type '3', the rendered output should include error-specific CSS classes or styling attributes.
**Validates: Requirements 6.3**

**Property 15: Binary items provide download capability**
*For any* menu item with type '9' or 'g', the rendered output should include a download link or download trigger.
**Validates: Requirements 6.4**

**Property 16: Navigation adds to history**
*For any* Gopher URL navigation, the history should contain an entry with that URL after navigation completes.
**Validates: Requirements 7.1**

**Property 17: History displays newest 50 entries**
*For any* history with more than 50 entries, displaying the history should show exactly the 50 most recent entries in reverse chronological order.
**Validates: Requirements 7.2, 7.5**

**Property 18: History clear removes all entries**
*For any* non-empty history, clearing should result in an empty history list.
**Validates: Requirements 7.4**

**Property 19: Cached content is served offline**
*For any* previously cached Gopher resource, requesting it while offline should return the cached content without a network request.
**Validates: Requirements 8.4**

## Error Handling

### Connection Errors

- **TCP Connection Failures**: When a Gopher server is unreachable, the backend should return a 503 status with a descriptive error message. The frontend should display this in the retro-themed error UI.
- **Timeout Handling**: TCP connections should timeout after 10 seconds. The error message should indicate a timeout occurred.
- **Invalid Hostnames**: DNS resolution failures should be caught and reported as "Server not found" errors.

### Protocol Errors

- **Malformed Responses**: If a Gopher server returns data that doesn't conform to RFC 1436, the parser should handle it gracefully by displaying the raw content as text.
- **Empty Responses**: Empty responses should be treated as valid but display a message indicating no content is available.
- **Invalid Item Types**: Unknown item types should be displayed with a generic icon and still be clickable, allowing users to attempt access.

### Client-Side Errors

- **Invalid URLs**: URL parsing errors should display a validation message without attempting to connect.
- **LocalStorage Quota**: If localStorage is full, bookmark/history operations should fail gracefully with a user-friendly message.
- **Offline State**: When offline, the UI should clearly indicate the offline state and which operations are unavailable.

### Error Recovery

- All errors should be logged to the console for debugging
- Users should be able to retry failed operations
- The application should never crash; all errors should be caught and displayed

## Testing Strategy

### Unit Testing

We will use **Vitest** as the testing framework for both frontend and backend code.

**Backend Unit Tests:**
- GopherClient connection handling with mock TCP sockets
- GopherParser with various RFC 1436 compliant and edge-case inputs
- Express route handlers with mocked dependencies
- URL parsing and validation functions

**Frontend Unit Tests:**
- Component rendering with React Testing Library
- State management logic
- LocalStorage operations with mocked storage
- URL parsing and building functions
- Service worker registration

**Key Test Cases:**
- Empty menu parsing
- Single-item menus
- Menus with all item types
- Text files with various line endings (CRLF, LF)
- Invalid URLs
- Connection timeouts
- Empty search queries

### Property-Based Testing

We will use **fast-check** for property-based testing in TypeScript.

**Configuration:**
- Each property test should run a minimum of 100 iterations
- Tests should use appropriate generators for Gopher-specific data types
- Shrinking should be enabled to find minimal failing cases

**Property Test Requirements:**
- Each property-based test MUST be tagged with a comment referencing the correctness property from this design document
- Tag format: `// Feature: gopher-browser, Property {number}: {property_text}`
- Each correctness property MUST be implemented by a SINGLE property-based test

**Generators Needed:**
- `arbitraryGopherUrl()`: Generates valid Gopher URLs
- `arbitraryGopherMenu()`: Generates RFC 1436 compliant menu strings
- `arbitraryMenuItem()`: Generates individual menu items with valid types
- `arbitraryTextContent()`: Generates text with various line endings
- `arbitraryBookmark()`: Generates bookmark objects
- `arbitraryHistoryEntry()`: Generates history entries
- `arbitrarySearchQuery()`: Generates non-empty search strings

**Property Tests to Implement:**
- Gopher URL parsing round-trip (Property 1)
- Menu parsing round-trip (Property 2)
- Text line break preservation (Property 3)
- Icon type correspondence (Property 4)
- Navigation request correctness (Property 5)
- History navigation reversibility (Property 6)
- Bookmark field completeness (Property 7)
- Bookmark sorting by timestamp (Property 8)
- Bookmark deletion consistency (Property 9)
- LocalStorage persistence (Property 10)
- Search query formatting (Property 11)
- Item type recognition (Property 12)
- Informational item non-interactivity (Property 13)
- Error item styling (Property 14)
- Binary item download links (Property 15)
- History recording (Property 16)
- History size limiting (Property 17)
- History clearing (Property 18)
- Offline caching (Property 19)

### Integration Testing

- End-to-end tests using Playwright for critical user flows
- Test against a local mock Gopher server
- Verify PWA installation and offline functionality
- Test bookmark and history persistence across sessions

### Manual Testing

- Visual verification of retro-futuristic theme
- Responsive design on mobile devices
- PWA installation on iOS and Android
- Accessibility testing with screen readers
- Testing against real Gopher servers (gopher://gopher.floodgap.com)

## Performance Considerations

- **Connection Pooling**: Reuse TCP connections to the same Gopher server when possible
- **Caching**: Cache Gopher responses in the service worker for offline access
- **Lazy Loading**: Load history and bookmarks on-demand rather than at startup
- **Debouncing**: Debounce search input to avoid excessive requests
- **Virtual Scrolling**: For large menus (>100 items), implement virtual scrolling

## Security Considerations

- **Input Validation**: Sanitize all user inputs before sending to Gopher servers
- **XSS Prevention**: Escape all Gopher content before rendering in the browser
- **CORS**: Backend should validate origin headers in production
- **Rate Limiting**: Implement rate limiting on the backend to prevent abuse
- **Content Security Policy**: Strict CSP headers to prevent injection attacks

## Deployment

- **Frontend**: Static hosting on Vercel or Netlify
- **Backend**: Node.js server on Railway, Render, or similar
- **Environment Variables**: Backend URL configurable via environment variable
- **PWA Manifest**: Properly configured for installation
- **HTTPS**: Required for PWA functionality and service workers

## Future Enhancements

- Gopher+ protocol support
- Full-text search across visited pages
- Export bookmarks to HTML
- Custom themes beyond the default retro style
- Gopher server hosting capabilities
- Browser extension version
