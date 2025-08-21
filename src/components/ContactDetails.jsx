import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Phone,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Plus,
  Edit3,
  Check,
  X
} from 'lucide-react';
import contactFieldsConfig from '../data/contactFields.json';

const ContactDetails = ({
  currentIndex,
  totalContacts,
  contactData,
  onNext,
  onPrevious,
  onBack,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState(
    contactFieldsConfig.folders.reduce((acc, folder) => {
      acc[folder.id] = folder.defaultExpanded !== false;
      return acc;
    }, {})
  );
  const [editingSection, setEditingSection] = useState(null);
  const [editData, setEditData] = useState(contactData);

  const handleEdit = (section) => {
    setEditingSection(section);
    setEditData({ ...contactData });
  };

  const handleSave = () => {
    onSave?.(editData);
    setEditingSection(null);
  };

  const handleCancel = () => {
    setEditData({ ...contactData });
    setEditingSection(null);
  };

  const updateEditData = (section, field, value) => {
    setEditData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const renderEditableField = (folder, field, isEditing) => {
    console.log(editData, folder.id, field.id, editData?.[folder.id]?.[field.id], field.id);
    const value = editData[field.id] ?? '';
    if (isEditing) {
      return (
        <div className="field-group" key={field.id}>
          <label className="field-label">
            {field.name}
            {field.required && <span style={{ color: 'red', marginLeft: 4 }}>*</span>}
          </label>
          <input
            type={field.type === 'email' ? 'email' : 'text'}
            value={value}
            placeholder={field.placeholder}
            onChange={(e) => updateEditData(folder.id, field.id, e.target.value)}
            className="field-input"
          />
        </div>
      );
    }
    return (
      <div className="field-group" key={field.id}>
        <label className="field-label">{field.name}</label>
        <div className="field-value">{value}</div>
      </div>
    );
  };

  const renderSection = (folder) => {
    const isEditing = editingSection === folder.id;
    const isExpanded = expandedSections[folder.id];
    return (
      <div className="accordion-section" key={folder.id}>
        <div
          className="accordion-header"
          onClick={() =>
            setExpandedSections((prev) => ({
              ...prev,
              [folder.id]: !prev[folder.id]
            }))
          }
        >
          <h3>{folder.name}</h3>
          <div className="accordion-actions">
            {isEditing ? (
              <div className="edit-actions">
                <button className="save-button" onClick={handleSave}>
                  <Check size={16} />
                </button>
                <button className="cancel-button" onClick={handleCancel}>
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button className="edit-button" onClick={() => handleEdit(folder.id)}>
                <Edit3 size={16} />
              </button>
            )}
            <button className="expand-button">
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>
        {isExpanded && (
          <div className="accordion-content">
            <div className="fields-grid">
              {folder.fields.map((field) =>
                renderEditableField(folder, field, isEditing)
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="contact-details">
      {/* Header */}
      <div className="contact-header">
        <div className="header-left">
          <button className="back-button" onClick={onBack}>
            <ArrowLeft size={20} />
          </button>
          <h4>Contact Details</h4>
        </div>
        <div className="header-right">
          <span className="pagination">
            {currentIndex} of {totalContacts}
          </span>
          <button
            className="nav-button"
            onClick={onPrevious}
            disabled={currentIndex <= 1}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="nav-button"
            onClick={onNext}
            disabled={currentIndex >= totalContacts}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      {/* Info Card, Tabs, Search, etc. */}
      <div className="contact-info-card">
        <div className="contact-avatar">
          {contactData?.avatar ? (
            <img src={contactData.avatar} alt={contactData.firstName} />
          ) : (
            <div className="avatar-placeholder">
              {contactData?.firstName + contactData?.lastName}
            </div>
          )}
        </div>
        <div className="contact-basic-info">
          <h2>{contactData?.firstName + contactData?.lastName}</h2>
          <div className="contact-meta">
            <div className="meta-item">
              <span className="meta-label">Owner</span>
              <div className="owner-info">
                <div className="owner-avatar"></div>
                <span>{contactData?.owner}</span>
                <ChevronDown size={16} />
              </div>
            </div>
            <div className="meta-item">
              <span className="meta-label">Followers</span>
              <div className="followers-info">
                <div className="followers-avatars">
                  {contactData?.followers.map((follower, index) => (
                    <div key={index} className="follower-avatar"></div>
                  ))}
                </div>
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
          <div className="contact-tags">
            <span className="tags-label">Tags</span>
            <div className="tags-list">
              {contactData.tags.map((tag, index) => (
                <span key={index} className={`tag tag-${tag.color}`}>
                  {tag.label}
                  <X size={12} />
                </span>
              ))}
              <button className="add-tag-button">
                +
              </button>
            </div>
          </div>
        </div>
        <button className="call-button">
          <Phone size={20} />
        </button>
      </div>
      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Fields
          </button>
          <button 
            className={`tab ${activeTab === 'dnd' ? 'active' : ''}`}
            onClick={() => setActiveTab('dnd')}
          >
            DND
          </button>
          <button 
            className={`tab ${activeTab === 'actions' ? 'active' : ''}`}
            onClick={() => setActiveTab('actions')}
          >
            Actions
          </button>
        </div>
      </div>
      <div className="search-section">
        <div className="search-input-container">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search Fields and Folders"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="filter-button">
            <Filter size={16} />
          </button>
        </div>
      </div>
      {/* Render all sections from config */}
      {contactFieldsConfig.folders.map(renderSection)}
    </div>
  );
};

export default ContactDetails;