import React from 'react';
import '../styles/ContactLayout.scss';
import '../styles/Conversation.scss';
import '../styles/ContactDetails.scss';
import NotesSection from './NotesSection';
import ConversationContainer from './ConversationContainer';
import ContactDetails from '../ContactDetails';



const ResponsiveContactLayout = ({contact,conversation}) => {
    console.log('ResponsiveContactLayout', contact, conversation);
  return (
    <div className="contact-layout">
      <div>
        <ContactDetails
          currentIndex={1}
          totalContacts={356}
          contactData={contact}
          onNext={() => console.log('Next contact')}
          onPrevious={() => console.log('Previous contact')}
          onSave={(data) => console.log('Save contact:', data)}
        />
      </div>
      <ConversationContainer
        message={conversation}
        onReply={(id) => console.log('Reply to:', id)}
        onStar={(id) => console.log('Star:', id)}
        onDropdownAction={(id, action) =>
          console.log('Action:', action, 'on:', id)
        }
      />
      <NotesSection />
    </div>
  );
};
export default ResponsiveContactLayout;
