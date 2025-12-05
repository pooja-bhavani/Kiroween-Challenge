import { HistoryEntry } from '../types';
import './Panel.css';

interface HistoryPanelProps {
  history: HistoryEntry[];
  onNavigate: (url: string) => void;
  onClear: () => void;
  onClose: () => void;
}

export default function HistoryPanel({ history, onNavigate, onClear, onClose }: HistoryPanelProps) {
  const handleClear = () => {
    if (confirm('Clear all history?')) {
      onClear();
    }
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>📜 HISTORY</h2>
        <div className="panel-actions">
          {history.length > 0 && (
            <button className="clear-button" onClick={handleClear}>
              Clear All
            </button>
          )}
          <button className="close-button" onClick={onClose}>✕</button>
        </div>
      </div>
      <div className="panel-content">
        {history.length === 0 ? (
          <p className="empty-message">No history yet.</p>
        ) : (
          <div className="item-list">
            {history.map((entry, index) => (
              <div key={index} className="panel-item">
                <button
                  className="item-link"
                  onClick={() => {
                    onNavigate(entry.url);
                    onClose();
                  }}
                >
                  <div className="item-title">{entry.title}</div>
                  <div className="item-url">{entry.url}</div>
                  <div className="item-time">
                    {new Date(entry.timestamp).toLocaleString()}
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
