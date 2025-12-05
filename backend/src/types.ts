export interface GopherRequest {
  host: string;
  port: number;
  selector: string;
  searchQuery?: string;
}

export interface GopherResponse {
  content: string;
  error?: string;
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
