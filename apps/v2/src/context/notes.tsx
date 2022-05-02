import { memo, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { Temporal } from "@js-temporal/polyfill";
import { nanoid } from "nanoid";
import crypto from "crypto-js";

export type Note = {
  id: string;

  slug?: string;
  title?: string;
  text: string;

  createdAt: Temporal.Instant;
};

type NotesContextProps = {
  notes: Note[];

  createNote: () => void;
  editTitle: (noteId: string, title: string) => void;
  editText: (noteId: string, text: string) => void;
  deleteNote: (props: DeleteNoteProps) => void;
};

type DeleteNoteProps = {
  id: string;
};

export const NotesContext = createContext({} as NotesContextProps);

type NotesProviderProps = {
  children: React.ReactNode;
};

// the secret key responsible for encrypting data
const notesSK = "brujh";

const slugify = (string: string) => string.split(" ").join("-").toLowerCase();

const encrypt = (data: string | object) => {
  if (typeof data === "object") {
    return crypto.AES.encrypt(JSON.stringify(data), notesSK).toString();
  }

  return crypto.AES.encrypt(data, notesSK).toString();
};

export const decrypt = (data: string | object) => {
  // console.log(decy.toString(crypto.enc.Utf8));

  if (typeof data === "object") {
    return crypto.AES.decrypt(JSON.stringify(data), notesSK).toString(
      crypto.enc.Utf8
    );
  }

  return crypto.AES.decrypt(data, notesSK).toString(crypto.enc.Utf8);
};

// prettier-ignore
export const NotesProvider: React.FC<NotesProviderProps> = memo(({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const localStorageNotes = localStorage.getItem("@notely:notes");

    if (!localStorageNotes) {
      return;
    }

    type NoteWithStringDate = Omit<Note, "createdAt"> & {
      createdAt: string;
    };

    const parsedLocalStorageNotes = JSON.parse(
      localStorageNotes
    ) as NoteWithStringDate[];

    // Temporal.Instant when saved to localStorage become ISO dates, so im converting it back to Temporal.Instant
    const notesWithConvertedDates = parsedLocalStorageNotes.map(({ title, slug, text, createdAt, ...note }) => ({
      title: decrypt(title || ""),
      slug: decrypt(slug || ""),
      text: decrypt(text),
      createdAt: Temporal.Instant.from(createdAt),
      ...note
    }));

    setNotes(notesWithConvertedDates);
  }, []);

  const createNote = useCallback(() => {
    const note: Note = {
      id: nanoid(8),
      text: encrypt(""),
      createdAt: Temporal.Now.instant(),
    };

    setNotes((notes) => [note, ...notes]);

    localStorage.setItem("@notely:notes", JSON.stringify([note, ...notes]));
  }, [notes]);

  const editTitle = useCallback(
    (noteId: string, title: string) => {
      const modifiedNotes = notes.map((note) => {
        if (noteId === note.id) {
          return {
            ...note,
            // too lazy to do pipe fn in here :/
            slug: encrypt(slugify(title)),
            title: encrypt(title),
          };
        }

        return note;
      });

      setNotes(modifiedNotes);

      localStorage.setItem("@notely:notes", JSON.stringify(modifiedNotes));
    },
    [notes]
  );

  const editText = useCallback(
    (noteId: string, text: string) => {
      const modifiedNotes = notes.map((note) => {
        if (noteId === note.id) {
          return {
            ...note,
            text: encrypt(text),
          };
        }

        return note;
      });

      setNotes(modifiedNotes);

      localStorage.setItem("@notely:notes", JSON.stringify(modifiedNotes));
    },
    [notes]
  );

  const deleteNote = useCallback(
    ({ id }: DeleteNoteProps) => {
      setNotes((notes) => notes.filter((note) => note.id !== id));

      localStorage.setItem(
        "@notely:notes",
        JSON.stringify(notes.filter((note) => note.id !== id))
      );
    },
    [notes]
  );

  return (
    <NotesContext.Provider
      value={{ notes, createNote, editTitle, deleteNote, editText }}
    >
      {children}
    </NotesContext.Provider>
  );
});
