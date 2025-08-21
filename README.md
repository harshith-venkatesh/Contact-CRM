# CRM Contacts UI

A modern, responsive CRM contacts management UI built with React and Vite.

## 🚀 How to Run the App

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) by default.

3. **Build for production:**
   ```sh
   npm run build
   ```

4. **Run tests:**
   ```sh
   npm test
   ```

5. **Lint the code:**
   ```sh
   npm run lint
   ```

---

## 🛠 Tech Stack Used
- **React** (with functional components & hooks)
- **Vite** (for fast dev/build)
- **ESLint** & **Prettier** (linting & formatting)
- **Jest** & **React Testing Library** (unit testing)
- **Sass/SCSS** (for styling)
- **lucide-react** (icon library)

---

## 📁 Folder Structure

```
src/
  components/
    common/           # Shared UI components (FieldDisplayRender, ConversationContainer, etc.)
    contact/          # Contact-related pages/components (DynamicContactpage, etc.)
    styles/           # SCSS stylesheets
    ContactDetails.jsx
    Header.jsx
  data/
    contactData.json        # Demo contact data
    contactFields.json      # Field/folder config for contacts
    conversationData.json   # Demo conversation data
    layout.json             # Layout config for responsive UI
  hooks/
    useResponsiveContactLayout.js  # Hook for layout/section order
  App.jsx, main.jsx, ...
public/
  vite.svg, ...
```

---

## 🗂 How Each JSON Config is Used

- **contactData.json**: Demo data for contacts (used for initial state and UI demo).
- **contactFields.json**: Defines all possible fields and folders (sections) for a contact. Controls which fields appear, their types, validation, and grouping.
- **conversationData.json**: Demo data for conversations/messages and replies, used in the conversation UI.
- **layout.json**: Determines the order, grouping, and layout (span/columns) of sections in the responsive contact layout. Used by the `useResponsiveContactLayout` hook to render the UI dynamically.

---

## ⚠️ Known Issues
- Layout JSON file was not utilised because of minimal clarity.
- The app uses static demo data; no backend or real API integration is present.
- Some field types (e.g., file upload, advanced validation) may be placeholders or not fully implemented.
- Some UI/UX polish and accessibility improvements are ongoing.

---

For questions or contributions, please open an issue or PR!
