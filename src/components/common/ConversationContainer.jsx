import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Reply, 
  MoreHorizontal,
  User,
  Icon
} from 'lucide-react';



const ConversationContainer = ({
  message,
  onReply,
  onStar,
  onDropdownAction
}) => {
    console.log('ConversationContainer', message);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleReply = () => {
    onReply?.(message.id);
  };

  const handleStar = () => {
    onStar?.(message.id);
  };

  const handleDropdownAction = (action) => {
    onDropdownAction?.(message.id, action);
    setShowDropdown(false);
  };

  return (
    <div className='conversation-layout'> 
    <h4>Conversations</h4>
    <div className="conversation-container">
      {/* Main Email Accordion */}
      <div className="email-accordion">
        {/* Accordion Header */}
        <div 
          className="accordion-header"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="header-left">
            <button className="expand-button">
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <span className="subject">{message.subject}</span>
          </div>
          <div className="header-right">
            <span className="message-count">3</span>
          </div>
        </div>

        {/* Accordion Content */}
        {isExpanded && (
          <div className="accordion-content">
            <div className="message-header">
              <div className="sender-info">
                <div className="avatar">
                  {message.avatar ? (
                    <img src={message.avatar} alt={message.sender} />
                  ) : (
                    <User size={20} />
                  )}
                </div>
                <div className="sender-details">
                  <div className="sender-name">{message.sender}</div>
                  <div className="recipient">To: {message.recipient}</div>
                </div>
              </div>
              <div className="message-actions">
                <span className="timestamp">{message.timestamp}</span>
                <button 
                  className={`star-button ${message.isStarred ? 'starred' : ''}`}
                  onClick={handleStar}
                >
                  <Star size={16} fill={message.isStarred ? '#fbbf24' : 'none'} />
                </button>
                <button className="reply-button" onClick={handleReply}>
                  <Reply size={16} />
                </button>
                <div className="dropdown-container">
                  <button 
                    className="dropdown-button"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <MoreHorizontal size={16} />
                  </button>
                  {showDropdown && (
                    <div className="dropdown-menu">
                      <button onClick={() => handleDropdownAction('forward')}>Forward</button>
                      <button onClick={() => handleDropdownAction('archive')}>Archive</button>
                      <button onClick={() => handleDropdownAction('delete')}>Delete</button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="message-content">
              <p>{message.content}</p>
              
              {message.trackingLink && (
                <div className="tracking-section">
                  <a href={message.trackingLink} className="track-order-link">
                    Track Your Order
                  </a>
                </div>
              )}

              <div className="message-actions-bottom">
                <button className="reply-button-primary" onClick={handleReply}>
                  <Reply size={16} />
                  Reply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {message?.replies.length > 0 && (
        <div className="replies-section">
          {message.replies.map((reply) => (
            <div key={reply.id} className="reply-message">
              <div className="reply-avatar">
                {reply.avatar ? (
                  <img src={reply.avatar} alt={reply.sender} />
                ) : (
                  <User size={16} />
                )}
              </div>
              <div className="reply-content">
                <div className="reply-header">
                  <span className="reply-sender">{reply.sender}</span>
                  <span className="reply-timestamp">{reply.timestamp}</span>
                </div>
                <div className="reply-text">{reply.content}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default ConversationContainer;