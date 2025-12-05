export interface GopherUrl {
  protocol: 'gopher';
  host: string;
  port: number;
  itemType: string;
  selector: string;
}

export interface GopherMenuItem {
  type: string;
  display: string;
  selector: string;
  host: string;
  port: number;
}

export interface ParsedGopherContent {
  isMenu: boolean;
  items?: GopherMenuItem[];
  text?: string;
}

export interface Bookmark {
  id: string;
  url: string;
  title: string;
  timestamp: number;
}

export interface HistoryEntry {
  url: string;
  title: string;
  timestamp: number;
}

export interface GopherBrowserState {
  currentUrl: GopherUrl | null;
  content: ParsedGopherContent | null;
  loading: boolean;
  error: string | null;
  history: HistoryEntry[];
  bookmarks: Bookmark[];
}
