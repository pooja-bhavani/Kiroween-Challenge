# Implementation Plan

- [x] 1. Set up project structure and dependencies
  - Initialize Node.js backend with Express and TypeScript
  - Initialize React frontend with Vite and TypeScript
  - Install testing dependencies (Vitest, fast-check, React Testing Library, Playwright)
  - Configure build scripts and development environment
  - Set up monorepo structure with backend and frontend folders
  - _Requirements: All_

- [x] 2. Implement backend Gopher protocol handler
  - Create GopherClient class with TCP socket connection logic
  - Implement request formatting (selector + CRLF)
  - Add connection timeout handling (10 seconds)
  - Handle connection errors and DNS failures
  - _Requirements: 1.1, 1.5_

- [ ]* 2.1 Write property test for URL parsing
  - **Property 1: Gopher URL parsing extracts correct connection parameters**
  - **Validates: Requirements 1.1**

- [x] 2.2 Implement GopherParser for RFC 1436 parsing
  - Parse Gopher menu format (type + display + selector + host + port)
  - Detect whether response is a menu or plain text
  - Handle all item types: 0, 1, 3, 7, 8, 9, g, h, i
  - Extract fields from tab-delimited menu lines
  - _Requirements: 1.2, 1.3, 6.1_

- [ ]* 2.3 Write property test for menu parsing round-trip
  - **Property 2: Gopher menu round-trip consistency**
  - **Validates: Requirements 1.2, 1.3**

- [ ]* 2.4 Write property test for item type recognition
  - **Property 12: All specified item types are recognized**
  - **Validates: Requirements 6.1**

- [x] 2.5 Create Express API routes
  - Implement GET /api/gopher endpoint with query parameters
  - Add CORS middleware for development
  - Integrate GopherClient and GopherParser
  - Return JSON responses with parsed content or errors
  - _Requirements: 1.1, 1.2, 1.5_

- [ ]* 2.6 Write unit tests for backend components
  - Test GopherClient with mock TCP sockets
  - Test GopherParser with various menu formats
  - Test Express routes with mocked dependencies
  - Test error handling for connection failures

- [x] 3. Implement frontend core components and state management
  - Create GopherBrowser main component with state management
  - Implement URL parsing and building utilities
  - Create API client for backend communication
  - Set up React Router for navigation
  - _Requirements: 1.1, 2.5_

- [x] 3.1 Build AddressBar component
  - Create URL input field with validation
  - Add back button with disabled state when no history
  - Add bookmark button
  - Implement navigation on Enter key
  - _Requirements: 2.5_

- [x] 3.2 Build ContentDisplay component
  - Render Gopher menus as clickable lists
  - Display plain text content with preserved formatting
  - Add item type icons for each menu item
  - Handle click events for navigation
  - _Requirements: 1.4, 2.1, 2.2, 2.3, 2.4_

- [ ]* 3.3 Write property test for text line break preservation
  - **Property 3: Text content preserves line breaks**
  - **Validates: Requirements 1.4**

- [ ]* 3.4 Write property test for menu item icons
  - **Property 4: Menu items render with type-appropriate icons**
  - **Validates: Requirements 2.1**

- [ ]* 3.5 Write property test for navigation requests
  - **Property 5: Navigation triggers correct resource fetch**
  - **Validates: Requirements 2.2, 2.3, 2.4**

- [x] 3.6 Implement item type-specific rendering
  - Render type 'i' items as non-clickable text
  - Render type '3' items with error styling
  - Render types '9' and 'g' as download links
  - Render type 'h' to open in new tab
  - _Requirements: 6.2, 6.3, 6.4, 2.4_

- [ ]* 3.7 Write property tests for item type rendering
  - **Property 13: Informational items are non-interactive**
  - **Property 14: Error items have distinct styling**
  - **Property 15: Binary items provide download capability**
  - **Validates: Requirements 6.2, 6.3, 6.4**

- [x] 4. Implement search functionality
  - Create SearchInput component for type 7 items
  - Format search queries with tab + CRLF
  - Validate non-empty queries before submission
  - Display search results as Gopher menus
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ]* 4.1 Write property test for search query formatting
  - **Property 11: Search queries include tab and CRLF**
  - **Validates: Requirements 5.2**

- [x] 5. Implement bookmark management
  - Create Bookmark data model with id, url, title, timestamp
  - Implement BookmarkPanel component
  - Add bookmark creation with all required fields
  - Implement bookmark deletion
  - Sort bookmarks by timestamp (most recent first)
  - Persist bookmarks to localStorage
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ]* 5.1 Write property tests for bookmark operations
  - **Property 7: Bookmark creation captures all required fields**
  - **Property 8: Bookmarks are sorted by recency**
  - **Property 9: Bookmark deletion removes from storage**
  - **Property 10: Bookmark operations persist to localStorage**
  - **Validates: Requirements 3.1, 3.2, 3.4, 3.5**

- [x] 6. Implement navigation history
  - Create HistoryEntry data model
  - Implement HistoryPanel component
  - Record URL and timestamp on each navigation
  - Limit history to 50 most recent entries
  - Implement history clear functionality
  - Enable back button navigation through history
  - _Requirements: 2.5, 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ]* 6.1 Write property tests for history operations
  - **Property 6: History navigation is reversible**
  - **Property 16: Navigation adds to history**
  - **Property 17: History displays newest 50 entries**
  - **Property 18: History clear removes all entries**
  - **Validates: Requirements 2.5, 7.1, 7.2, 7.4, 7.5**

- [x] 7. Implement retro-futuristic UI theme
  - Create CSS with dark background and green phosphor text
  - Use monospace fonts throughout
  - Add glow effects on hover for links
  - Create themed loading animation
  - Style error messages consistently with theme
  - Add ASCII-style decorative elements
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 8. Implement PWA functionality
  - Create service worker for offline caching
  - Register service worker on app load
  - Create PWA manifest with app metadata and icons
  - Cache Gopher responses for offline access
  - Display offline message for uncached content
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ]* 8.1 Write property test for offline caching
  - **Property 19: Cached content is served offline**
  - **Validates: Requirements 8.4**

- [ ] 9. Add error handling and edge cases
  - Handle connection timeouts with clear messages
  - Handle malformed Gopher responses gracefully
  - Validate URLs before attempting connections
  - Handle localStorage quota exceeded errors
  - Display appropriate messages for all error states
  - _Requirements: 1.5, 5.4, 5.5_

- [ ]* 9.1 Write unit tests for error handling
  - Test connection failure scenarios
  - Test malformed response handling
  - Test invalid URL validation
  - Test localStorage quota errors
  - Test empty search query validation

- [ ] 10. Polish and optimize
  - Add loading states for all async operations
  - Implement debouncing for search input
  - Optimize rendering for large menus
  - Add keyboard shortcuts (Ctrl+L for address bar, etc.)
  - Ensure responsive design for mobile devices
  - _Requirements: 4.4_

- [x] 11. Create deployment configuration
  - Set up Vercel/Netlify config for frontend
  - Set up Railway/Render config for backend
  - Configure environment variables
  - Set up HTTPS and CORS for production
  - Add Content Security Policy headers
  - _Requirements: All_

- [ ] 12. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ]* 13. Integration and E2E testing
  - Write Playwright tests for critical user flows
  - Test against mock Gopher server
  - Test PWA installation flow
  - Test bookmark/history persistence across sessions
  - Verify offline functionality

- [x] 14. Documentation and demo preparation
  - Write README with setup instructions
  - Document Kiro usage (specs, hooks, steering if used)
  - Create demo video script
  - Test against real Gopher servers
  - Prepare deployment for submission
  - _Requirements: All_
