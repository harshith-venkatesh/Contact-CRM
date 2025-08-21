import React, { useState } from 'react';


function NotesSection() {
  const [notes, setNotes] = useState([
    {
      id: '1',
      content: 'Meeting with @john tomorrow at 2 PM. Don\'t forget to prepare the presentation slides and review the @team feedback.',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
      id: '2',
      content: 'Need to call @sarah about the project update. She mentioned some important changes that @mike should know about.',
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
    },
    {
      id: '3',
      content: 'Buy groceries: milk, eggs, bread. Also remember to pick up the package from @amazon delivery center.',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
    }
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState('');

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return diffInMinutes <= 1 ? 'Just now' : `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
    } else {
      return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
    }
  };

  const parseContentWithMentions = (content) => {
    const words = content.split(' ');
    return words.map((word, index) => {
      if (word.startsWith('@')) {
        const mention = word.replace(/[.,!?;]$/, ''); // Remove trailing punctuation
        const punctuation = word.match(/[.,!?;]$/)?.[0] || '';
        return (
          <span key={index}>
            <span 
              className="mention"
              onClick={() => handleMentionClick(mention)}
            >
              {mention}
            </span>
            {punctuation}
            {index < words.length - 1 ? ' ' : ''}
          </span>
        );
      }
      return <span key={index}>{word}{index < words.length - 1 ? ' ' : ''}</span>;
    });
  };

  const handleMentionClick = (mention) => {
    alert(`Clicked on ${mention}`);
  };

  const handleAddNote = () => {
    if (newNoteContent.trim()) {
      const newNote = {
        id: Date.now().toString(),
        content: newNoteContent.trim(),
        createdAt: new Date()
      };
      setNotes([newNote, ...notes]);
      setNewNoteContent('');
      setIsAdding(false);
    }
  };

  const handleCancelAdd = () => {
    setNewNoteContent('');
    setIsAdding(false);
  };

  return (
    <div className="notes-app">
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="header-content">
            <div><b>Notes</b></div>  
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="add-button"
          >
            {'+'}
            Add
          </button>
        </div>

        {/* Add New Note Form */}
        {isAdding && (
          <div className="add-note-form">
            <textarea
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="Write your note here... Use @mentions to reference people or topics"
              autoFocus
            />
            <div className="form-actions">
              <button
                onClick={handleAddNote}
                className="save-button"
              >
                Save Note
              </button>
              <button
                onClick={handleCancelAdd}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        <div className="notes-grid">
          {notes.map((note) => (
            <div
              key={note.id}
              className="note-card"
            >
              <div className="note-content">
                <p>
                  {parseContentWithMentions(note.content)}
                </p>
              </div>
              <div className="note-timestamp">
                {formatTimeAgo(note.createdAt)}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {notes.length === 0 && !isAdding && (
          <div className="empty-state">
            <div className="empty-icon">
              <Plus size={48} />
            </div>
            <h3>No notes yet</h3>
            <p>Start by adding your first note</p>
            <button
              onClick={() => setIsAdding(true)}
              className="empty-add-button"
            >
              Add Your First Note
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotesSection;