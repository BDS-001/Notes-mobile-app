import useNotes from '../contexts/NotesContext';
import { useState, useEffect, useRef } from 'react';

export default function useAutosave(id) {
      const { getNoteById, saveNote, loading: contextLoading, error: contextError } = useNotes();
      const [note, setNote] = useState({ title: '', content: '' });
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      const saveTimeRef = useRef(null);
    
      useEffect(() => {
        const noteData = getNoteById(id);
        if (noteData) {
          setNote(noteData);
        }
        setLoading(false);
      }, [id, getNoteById]);
    
      const handleNoteChange = (text, key) => {
        if (saveTimeRef.current) clearTimeout(saveTimeRef.current);
        
        setNote(prev => {
            const updatedNote = { ...prev};
            updatedNote[key] = text
          
            saveTimeRef.current = setTimeout(() => {
                saveNote(id, updatedNote.title, updatedNote.content)
                .catch(err => {
                    console.error('Error saving title:', err);
                });
            }, 750);
          
            return updatedNote;
            });
        };

      return {handleNoteChange, note, loading, error, contextError, contextLoading}
}