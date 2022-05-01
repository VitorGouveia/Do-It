import { memo, useCallback, useState } from "react";
import { createContext } from "use-context-selector";
import { Temporal } from "@js-temporal/polyfill";
import { nanoid } from "nanoid";

export type Note = {
  id: string;

  slug?: string;
  title?: string;

  createdAt: Temporal.Instant;
};

type NotesContextProps = {
  notes: Note[];

  createNote: () => void;
  deleteNote: (props: DeleteNoteProps) => void;
};

type DeleteNoteProps = {
  id: string;
};

export const NotesContext = createContext({} as NotesContextProps);

type NotesProviderProps = {
  children: React.ReactNode;
};

// prettier-ignore
export const NotesProvider: React.FC<NotesProviderProps> = memo(({ children }) => {
  const [notes, setNotes] = useState<Note[]>([])

  const addNote = useCallback((newNote: Note) => {
    setNotes(notes => ([
      newNote,
      ...notes
    ]))

    localStorage.setItem("@notely:notes", JSON.stringify(notes))
  }, [notes])

  const createNote = useCallback(() => {
    const note: Note = {
      id: nanoid(8),
      createdAt: Temporal.Now.instant()
    }
    
    addNote(note)
  }, [addNote])

  const deleteNote = useCallback(({ id }: DeleteNoteProps) => {
    setNotes((notes) => notes.filter(note => note.id !== id));
  }, []);

  return (
    <NotesContext.Provider value={{ notes, createNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  ); 
});
