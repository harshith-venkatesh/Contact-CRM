import React, { useState, useEffect } from 'react'
import ResponsiveContactLayout from '../common/ResponsiveContactLayout'
import fieldsData from '../../data/contactFields.json'
import contactsData from '../../data/contactData.json'
import conversationsData from '../../data/conversationData.json'

const DynamicContactPage = () => {
  const [fields, setFields] = useState(null)
  const [contacts, setContacts] = useState(null)
  const [conversations, setConversations] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
   
  useEffect(() => {
    const loadContactData = async () => {
      try {
        setLoading(true)
        const cachedContacts = sessionStorage.getItem('contacts')
        if (cachedContacts) {
          setContacts(JSON.parse(cachedContacts))
        } else {
          await new Promise((res) => setTimeout(res, 1000))
          setContacts(contactsData.data)
          sessionStorage.setItem('contacts', JSON.stringify(contactsData.data))
        }
        setFields(fieldsData)
        setError(null)
      } catch (err) {
        setError('Failed to load configuration data')
        console.error('Configuration load error:', err)
      } finally {
        setLoading(false)
      }
    }

    const loadConversationData = async () => {
      try {
        setLoading(true)
        // Simulate network delay
        const cachedConversations = sessionStorage.getItem('conversations')
        if (cachedConversations) {
          setConversations(JSON.parse(cachedConversations))
        } else {
          await new Promise((res) => setTimeout(res, 1000))
          setConversations(conversationsData.data)
          sessionStorage.setItem('conversations', JSON.stringify(conversationsData.data))
        }
        setFields(fieldsData)
        setError(null)
      } catch (err) {
        setError('Failed to load configuration data')
        console.error('Configuration load error:', err)
      } finally {
        setLoading(false)
      }
    }
    loadContactData()
    loadConversationData()
  }, [])

  const pageStyle = {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  }
  const loadingStyle = {
    textAlign: 'center',
    padding: '60px 20px',
    fontSize: '18px',
    color: '#666',
  }
  const errorStyle = {
    textAlign: 'center',
    padding: '40px 20px',
    backgroundColor: '#ffebee',
    color: '#c62828',
    borderRadius: '8px',
    border: '1px solid #ffcdd2',
  }

  if (loading) {
    return (
      <div style={pageStyle}>
        <div style={loadingStyle}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}> </div>
          Loading contact data...
        </div>
      </div>
    )
  }
  if (error) {
    return (
      <div style={pageStyle}>
        <div style={errorStyle}>
          <h2>Error Loading Data</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '16px',
              padding: '8px 16px',
              backgroundColor: '#c62828',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={pageStyle}>
        <ResponsiveContactLayout
          contact={contacts[0]} // Assuming we want to show the first contact
          conversation={conversations[0]} // Assuming we want to show the first conversation
          folders={fields.folders}
          onEdit={() => console.log('Edit mode enabled')}
        />  
    </div>
  )
}

export default DynamicContactPage