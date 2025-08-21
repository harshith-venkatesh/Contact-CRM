import React from 'react'
import '../styles/FieldDisplayRenderer.scss'

const FieldDisplayRenderer = ({
  field,
  value,
  showLabel = true,
  className = '',
  style = {},
}) => {
  // Helper function to get initials from a name
  const getInitials = (name) => {
    if (!name || typeof name !== 'string' || name.trim() === '') return '??'
    const words = name
      .trim()
      .split(' ')
      .filter((word) => word.length > 0)
    if (words.length === 0) return '??'

    return words
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('')
  }

  // Helper function to format currency
  const formatCurrency = (value, currency = 'USD') => {
    if (value === null || value === undefined || isNaN(value)) return 'N/A'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(value)
  }

  // Helper function to format percentage
  const formatPercentage = (value) => {
    if (value === null || value === undefined || isNaN(value)) return 'N/A'
    return `${value}%`
  }

  // Helper function to format phone numbers
  const formatPhoneNumber = (phone) => {
    if (!phone || typeof phone !== 'string') return 'N/A'

    // Simple phone formatting for US numbers
    const cleaned = phone.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/)

    if (match) {
      return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`
    }

    return phone // Return original if formatting fails
  }

  // Helper function to format dates
  const formatDate = (date, includeTime = false) => {
    if (!date) return 'N/A'

    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date
      if (isNaN(dateObj.getTime())) return 'Invalid Date'

      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        ...(includeTime && {
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short',
        }),
      }

      return dateObj.toLocaleDateString('en-US', options)
    } catch {
      return 'Invalid Date'
    }
  }

  // Helper function to format time
  const formatTime = (time) => {
    if (!time) return 'N/A'

    try {
      // Assume time is in HH:mm format
      const [hours, minutes] = time.split(':').map(Number)
      if (isNaN(hours) || isNaN(minutes)) return time

      const date = new Date()
      date.setHours(hours, minutes)

      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return time
    }
  }

  // Helper function to render star rating
  const renderRating = (rating, maxRating = 5) => {
    const stars = []
    const validRating = isNaN(rating)
      ? 0
      : Math.max(0, Math.min(rating, maxRating))

    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= validRating ? 'filled' : 'empty'}`}
          role="presentation"
          aria-hidden="true"
        >
          ★
        </span>
      )
    }

    return (
      <div
        className="field-value-rating"
        role="img"
        aria-label={`${validRating} out of ${maxRating} stars`}
      >
        {stars}
        <span className="sr-only">
          {validRating} out of {maxRating} stars
        </span>
      </div>
    )
  }

  // Helper function to render location
  const renderLocation = (location) => {
    if (!location || typeof location !== 'object') {
      return <span aria-label="Location not available">📍 N/A</span>
    }

    const { address, city, state, country, lat, lng } = location
    let displayText = 'N/A'

    if (address || city || state || country) {
      displayText = [address, city, state, country].filter(Boolean).join(', ')
    } else if (lat && lng) {
      displayText = `${lat}, ${lng}`
    }

    return (
      <span
        className="field-value-location"
        aria-label={`Location: ${displayText}`}
      >
        <span className="location-icon">📍</span> {displayText}
      </span>
    )
  }

  // Main render function for field values
  const renderFieldValue = () => {
    // Handle null/undefined values (but not for avatar which needs special handling)
    if (
      (value === null || value === undefined || value === '') &&
      field.type !== 'avatar'
    ) {
      return (
        <span
          className="field-value-empty"
          style={{ color: '#999', fontStyle: 'italic' }}
          aria-label={`${field.name} is empty`}
        >
          N/A
        </span>
      )
    }

    switch (field.type) {
      case 'text':
      case 'notes':
        return (
          <span
            className={`field-value-text ${field.type === 'notes' ? 'notes' : ''}`}
            aria-label={`${field.name}: ${value}`}
          >
            {String(value)}
          </span>
        )

      case 'email':
        return (
          <a
            href={`mailto:${value}`}
            className="field-value-email"
            aria-label={`Email ${field.name}: ${value}`}
          >
            <span className="icon">📧</span> {String(value)}
          </a>
        )

      case 'phone': {
        const formattedPhone = formatPhoneNumber(String(value))
        return (
          <a
            href={`tel:${value}`}
            className="field-value-phone"
            aria-label={`Phone ${field.name}: ${formattedPhone}`}
          >
            <span className="icon">📞</span> {formattedPhone}
          </a>
        )
      }

      case 'url': {
        return (
          <a
            href={String(value)}
            target="_blank"
            rel="noopener noreferrer"
            className="field-value-url"
            aria-label={`Link ${field.name}: ${value}`}
          >
            <span className="icon">🔗</span> {String(value)}
          </a>
        )
      }

      case 'number':
        return (
          <span
            className="field-value-number"
            aria-label={`${field.name}: ${value}`}
          >
            {Number(value).toLocaleString()}
          </span>
        )

      case 'currency': {
        return (
          <span
            className="field-value-currency currency"
            aria-label={`${field.name}: ${formatCurrency(Number(value))}`}
          >
            {formatCurrency(Number(value))}
          </span>
        )
      }

      case 'percentage': {
        return (
          <span
            className="field-value-percentage"
            aria-label={`${field.name}: ${formatPercentage(Number(value))}`}
          >
            {formatPercentage(Number(value))}
          </span>
        )
      }

      case 'date':
        return (
          <span
            className="field-value-date"
            aria-label={`${field.name}: ${formatDate(String(value))}`}
          >
            <span className="icon">📅</span> {formatDate(String(value))}
          </span>
        )

      case 'datetime':
        return (
          <span
            className="field-value-datetime"
            aria-label={`${field.name}: ${formatDate(String(value), true)}`}
          >
            <span className="icon">📅</span> {formatDate(String(value), true)}
          </span>
        )

      case 'time':
        return (
          <span
            className="field-value-time"
            aria-label={`${field.name}: ${formatTime(String(value))}`}
          >
            <span className="icon">🕐</span> {formatTime(String(value))}
          </span>
        )

      case 'boolean': {
        const boolValue = Boolean(value)
        return (
          <span
            className={`field-value-boolean field-value-boolean--${boolValue}`}
            aria-label={`${field.name}: ${boolValue ? 'Yes' : 'No'}`}
          >
            {boolValue ? '✅ Yes' : '❌ No'}
          </span>
        )
      }

      case 'select':
        if (field.options && Array.isArray(field.options) && field.multiple) {
          // Multi-select
          const selected = Array.isArray(value) ? value : [value].filter(Boolean)
          if (selected.length === 0) {
            return (
              <span
                className="field-value-empty"
                style={{ color: '#999', fontStyle: 'italic' }}
                aria-label={`${field.name} has no selections`}
              >
                No selections
              </span>
            )
          }
          return (
            <div
              className="field-value-select"
              role="list"
              aria-label={`${field.name}: ${selected.length} selected`}
            >
              {selected.map((option, idx) => (
                <span
                  key={idx}
                  role="listitem"
                  className="field-value-tag"
                  aria-label={`Selected: ${option}`}
                >
                  {option}
                </span>
              ))}
            </div>
          )
        } else if (field.options && Array.isArray(field.options) && field.radio) {
          // Radio
          return (
            <span
              className="field-value-select"
              aria-label={`${field.name}: ${value}`}
            >
              {String(value)}
            </span>
          )
        } else {
          // Single select fallback
          return (
            <span
              className="field-value-select"
              aria-label={`${field.name}: ${value}`}
            >
              {String(value)}
            </span>
          )
        }

      case 'avatar': {
        const avatarUrl = typeof value === 'object' ? value.url : String(value)
        const fallbackText = field.name || 'Avatar'
        const initials = getInitials(fallbackText)

        return (
          <div className="field-value-avatar">
            <div
              className={`avatar-container ${avatarUrl ? 'has-image' : 'no-image'}`}
              style={{
                backgroundImage: avatarUrl ? `url(${avatarUrl})` : undefined,
              }}
              role="img"
              aria-label={
                avatarUrl
                  ? `Avatar for ${fallbackText}`
                  : `Avatar initials: ${initials}`
              }
            >
              {!avatarUrl && initials}
            </div>
            {avatarUrl && <span className="avatar-info">Image loaded</span>}
          </div>
        )
      }

      case 'rating':
        return renderRating(Number(value), field.validation?.max || 5)

      case 'color': {
        return (
          <div className="field-value-color">
            <div
              className="color-preview"
              style={{ backgroundColor: String(value) }}
              role="img"
              aria-label={`Color: ${value}`}
            />
            <span className="color-value">{String(value).toUpperCase()}</span>
          </div>
        )
      }

      case 'file': {
        const fileName = typeof value === 'object' ? value.name : String(value)
        return (
          <span className="field-value-file" aria-label={`File: ${fileName}`}>
            <span className="file-icon">📄</span> {fileName}
          </span>
        )
      }

      case 'location':
        return renderLocation(value)

      default:
        return (
          <span
            className="field-value-unknown"
            aria-label={`Unknown field type: ${field.type}`}
          >
            Unsupported type: {field.type}
          </span>
        )
    }
  }

  return (
    <div
      className={`field-display field-display--${field.type} ${className}`}
      style={style}
    >
      {showLabel && (
        <label className="field-display-label" id={`field-label-${field.id}`}>
          {field.name}
          {field.required && (
            <span className="required-indicator" aria-label="required">
              *
            </span>
          )}
        </label>
      )}
      <div
        className="field-display-value"
        aria-labelledby={showLabel ? `field-label-${field.id}` : undefined}
        role="text"
      >
        {renderFieldValue()}
      </div>
    </div>
  )
}

export default FieldDisplayRenderer
