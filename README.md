# Notes App

A privacy-focused, lightweight note-taking application built with React Native and Expo.

## 📱 Overview

Notes App is a simple, intuitive mobile application that enables users to create, edit, and manage their notes with an emphasis on privacy and simplicity. All data is stored locally on the user's device with no analytics, tracking, or cloud storage.

## ✨ Features

- **Create and Edit Notes**: Easily create new notes and edit existing ones with real-time autosaving
- **Organize by Recency**: Notes are automatically sorted by last modified date
- **Privacy-First**: All data stays on your device with no tracking or data collection
- **Dark Theme**: Eye-friendly dark mode interface
- **Offline Operation**: No internet connection required
- **Minimal and Clean UI**: Distraction-free note-taking experience

## 🛠️ Technologies Used

- [React Native](https://reactnative.dev/) - Cross-platform mobile framework
- [Expo](https://expo.dev/) - React Native toolchain
- [Expo Router](https://docs.expo.dev/routing/introduction/) - File-based routing
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) - Local data persistence
- [React Context API](https://reactjs.org/docs/context.html) - State management
- [uuid](https://www.npmjs.com/package/uuid) - Unique ID generation

## 📦 Installation

To run this project locally:

1. Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed
2. Install Expo CLI globally:
   ```
   npm install -g expo-cli
   ```
3. Clone this repository:
   ```
   git clone https://github.com/yourusername/notes-app.git
   cd notes-app
   ```
4. Install dependencies:
   ```
   npm install
   ```
5. Start the development server:
   ```
   npx expo start
   ```

## 📱 Usage

- **View Notes**: Launch the app to see a list of all your notes sorted by most recently updated
- **Create Note**: Tap the "+ New Note" button to create a new note
- **Edit Note**: Tap on any note to view or edit its contents
- **Delete Note**: When viewing a note, tap the "Delete" button in the header to remove it
- **Return to List**: Tap "← Back" to return to the notes list

## 🏗️ Project Structure

```
./app/
├── components/         # Reusable UI components
│   └── Header.js       # App header with navigation
├── contexts/           # State management
│   └── NotesContext.js # Notes data and CRUD operations
├── hooks/              # Custom React hooks
│   └── useAutosave.js  # Auto-saving functionality
├── notes/              # Note detail screens
│   └── [id].js         # Dynamic note detail screen
├── styles/             # Styling files
│   ├── aboutStyles.js  # About page styles
│   ├── global.js       # Theming and shared styles
│   ├── headerStyles.js # Header component styles
│   ├── homeStyles.js   # Home screen styles
│   └── notesStyles.js  # Note editor styles
├── _layout.js          # Root layout with provider
├── about.js            # About page
└── index.js            # Home/list screen
└── app.json                # Expo configuration
```

## 💡 Implementation Details

### State Management with Context API

The app uses React's Context API for state management, providing a clean way to access notes data throughout the application. The `NotesContext` handles all CRUD operations (Create, Read, Update, Delete) for notes.

```jsx
const { notes, loading, error, newNote } = useNotes();
```

### Local Data Persistence

Notes are stored locally using AsyncStorage, ensuring all user data remains on the device.

```jsx
// Save a note to AsyncStorage
await AsyncStorage.setItem(`NOTE_${id}`, JSON.stringify(note));
```

### Auto-saving Feature

The app implements an automatic saving mechanism with a debounce timer, so users don't have to manually save their notes.

```jsx
// Auto-save implementation with 750ms debounce
saveTimeRef.current = setTimeout(() => {
    saveNote(id, updatedNote.title, updatedNote.content);
}, 750);
```

### Responsive Design

The app uses a flexible design system with consistent spacing, typography, and color schemes defined in the global styles.

## 🔒 Privacy Focus

This application:
- Stores all data locally on your device
- Does not collect analytics or telemetry
- Does not require account creation
- Does not require internet access
- Has no third-party tracking

## 🚀 Future Improvements

Some potential enhancements that could be added:

- Light/dark theme toggle
- Rich text formatting options
- Note categorization with tags
- Export/import functionality
- Search capability
- Biometric authentication for sensitive notes
- Custom sorting options

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Built with ❤️ using React Native and Expo*