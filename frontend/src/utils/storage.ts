import { Bookmark, HistoryEntry } from '../types';

const BOOKMARKS_KEY = 'gopher_bookmarks';
const HISTORY_KEY = 'gopher_history';
const MAX_HISTORY = 50;

export function loadBookmarks(): Bookmark[] {
  try {
    const stored = localStorage.getItem(BOOKMARKS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading bookmarks:', error);
    return [];
  }
}

export function saveBookmarks(bookmarks: Bookmark[]): void {
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  } catch (error) {
    console.error('Error saving bookmarks:', error);
    throw new Error('Failed to save bookmarks. Storage may be full.');
  }
}

export function loadHistory(): HistoryEntry[] {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading history:', error);
    return [];
  }
}

export function saveHistory(history: HistoryEntry[]): void {
  try {
    // Limit to MAX_HISTORY entries
    const limited = history.slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(limited));
  } catch (error) {
    console.error('Error saving history:', error);
    throw new Error('Failed to save history. Storage may be full.');
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing history:', error);
  }
}
