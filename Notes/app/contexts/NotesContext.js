import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuid } from 'uuid';

export const NotesContext = createContext();

export default function useNotes() {
  return useContext(NotesContext);
}

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [dbReady, setDbReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize the database
  useEffect(() => {
    const initializeDB = async () => {
      try {
        const initialized = await AsyncStorage.getItem('NOTES_DB_INIT');
        if (!initialized) {
          await AsyncStorage.setItem('NOTES_DB_INIT', "true");
          await AsyncStorage.setItem('NOTES_IDS', JSON.stringify([]));
        }
        
        await loadAllNotes();
        setDbReady(true);
      } catch (error) {
        console.error('Failed to initialize database:', error);
        setError('Database initialization failed');
      } finally {
        setLoading(false);
      }
    };
    
    initializeDB();
  }, []);

  const loadAllNotes = async () => {
    try {
      setLoading(true);
      const idsJson = await AsyncStorage.getItem('NOTES_IDS');
      const ids = idsJson ? JSON.parse(idsJson) : [];

      const notesPromises = ids.map(id =>
        AsyncStorage.getItem(`NOTE_${id}`).then(json => json ? JSON.parse(json) : null)
      );

      const loadedNotes = await Promise.all(notesPromises);
      
      // Filter out any null values and sort by updated_at
      const validNotes = loadedNotes
        .filter(note => note !== null)
        .sort((a, b) => b.updated_at - a.updated_at);
      
      setNotes(validNotes);
      return validNotes;
    } catch (err) {
      console.error('Error getting all notes:', err);
      setError('Failed to load notes');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getNoteById = (id) => {
    if (!id) return null;
    return notes.find(note => note.id === id) || null;
  };

  // Create a new note object
  const newNote = () => {
    const newNote = {
      id: uuid(),
      title: '',
      content: '',
      updated_at: Date.now()
    };
    
    return newNote;
  };

  // Save a note (update in memory and in storage)
  const saveNote = async (id, title, content) => {
    if (!id) return Promise.reject('Missing note id');
    
    try {
      const safeTitle = title || '';
      const safeContent = content || '';
      
      const note = { 
        id, 
        title: safeTitle, 
        content: safeContent, 
        updated_at: Date.now() 
      };
      
      // Update in AsyncStorage
      await AsyncStorage.setItem(`NOTE_${id}`, JSON.stringify(note));

      // Check if we need to add the ID to the IDs list
      const idsData = await AsyncStorage.getItem('NOTES_IDS');
      const ids = new Set(idsData ? JSON.parse(idsData) : []);

      if (!ids.has(id)) {
        ids.add(id);
        await AsyncStorage.setItem('NOTES_IDS', JSON.stringify(Array.from(ids)));
      }

      // Update in-memory array
      setNotes(prevNotes => {
        const noteIndex = prevNotes.findIndex(n => n.id === id);
        
        if (noteIndex >= 0) {
          // Update existing note
          const updatedNotes = [...prevNotes];
          updatedNotes[noteIndex] = note;

          // Sort to maintain order by updated_at
          return updatedNotes.sort((a, b) => b.updated_at - a.updated_at);
        } else {
          // Add new note
          return [note, ...prevNotes].sort((a, b) => b.updated_at - a.updated_at);
        }
      });

      return true;
    } catch (error) {
      console.error('Error saving note:', error);
      return Promise.reject('Error saving note');
    }
  };

  const deleteNote = async (id) => {
    if (!id) return Promise.reject('Missing note ID');

    try {
      await AsyncStorage.removeItem(`NOTE_${id}`);

      // Update IDs list
      const idsData = await AsyncStorage.getItem('NOTES_IDS');
      const ids = new Set(idsData ? JSON.parse(idsData) : []);

      if (ids.has(id)) {
        ids.delete(id);
        await AsyncStorage.setItem('NOTES_IDS', JSON.stringify([...ids]));
      }

      // Update in-memory array
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));

      return true;
    } catch (error) {
      console.error('Error deleting note:', error);
      return Promise.reject('Error deleting note');
    }
  };

  const contextValue = {
    notes,
    loading,
    error,
    dbReady,
    getNoteById,
    saveNote,
    deleteNote,
    newNote,
  };

  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  );
};