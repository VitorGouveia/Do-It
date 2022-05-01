import { useMemo } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useContext, useContextSelector } from "use-context-selector";
import { Temporal, Intl } from "@js-temporal/polyfill";

import { ThemeContext } from "../../context/theme";
import { NotesContext } from "../../context/notes";

const App: NextPage = () => {
  const theme = useContextSelector(ThemeContext, (context) => context.theme);

  const { notes, createNote, deleteNote } = useContext(NotesContext);

  const notesWithFormattedDates = useMemo(() => {
    return notes.map(({ createdAt, ...note }) => {
      const date = createdAt.toZonedDateTime({
        calendar: Temporal.Calendar.from("gregory"),
        timeZone: new Temporal.TimeZone("America/Sao_Paulo"),
      });

      const formattedDate = new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
      }).format(date);

      return {
        ...note,
        createdAt,
        formattedDate,
      };
    });
  }, [notes]);

  return (
    <div>
      <p>my app is using theme {theme}</p>

      <button onClick={() => createNote()}>new note</button>

      <ul>
        {notesWithFormattedDates.map(({ id, title, formattedDate }) => (
          <li key={id}>
            <div>
              <Link href={`/app/${title || id}`}>
                <a>{title || id}</a>
              </Link>
            </div>

            <div>{formattedDate}</div>

            <button onClick={() => deleteNote({ id })}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
