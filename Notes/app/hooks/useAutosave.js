import useNotes from '../contexts/NotesContext';
import { useState, useEffect } from 'react';

export default function useAutosave(id) {
      const { getNoteById, saveNote, loading: contextLoading, error: contextError } = useNotes();
      const [note, setNote] = useState({ title: '', content: '' });
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
    
      useEffect(() => {
        const noteData = getNoteById(id);
        if (noteData) {
          setNote(noteData);
        }
        setLoading(false);
      }, [id, getNoteById]);
    
      const handleTitleChange = (text) => {
        setNote(prev => {
          const updated = { ...prev, title: text };
          saveNote(id, updated.title, updated.content)
            .catch(err => {
              console.error('Error saving title:', err);
            });
          return updated;
        });
      };
    
      const handleContentChange = (text) => {
        setNote(prev => {
          const updated = { ...prev, content: text };
          saveNote(id, updated.title, updated.content)
            .catch(err => {
              console.error('Error saving content:', err);
            });
          return updated;
        });
      };

      return {handleContentChange, handleTitleChange, note, loading, error, contextError, contextLoading}
}