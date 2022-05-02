import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContextSelector } from "use-context-selector";
import { Temporal, Intl } from "@js-temporal/polyfill";
import Link from "next/link";

import { useTypeSafeRouter } from "../../hooks/use-type-safe-router";
import { Note, NotesContext } from "../../context/notes";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

type PipeFunction<Type> = (data: Type) => Type;

function pipeline<Type>(input: Type, ...methods: PipeFunction<Type>[]) {
  return methods.reduce((ac, cv) => cv(ac), input);
}

const Note: NextPage = () => {
  const getNotes = useContextSelector(
    NotesContext,
    (context) => context.getNotes
  );
  const editTitle = useContextSelector(
    NotesContext,
    (context) => context.editTitle
  );
  const editText = useContextSelector(
    NotesContext,
    (context) => context.editText
  );

  const notes = useMemo(() => getNotes(), [getNotes]);

  const router = useTypeSafeRouter<{ slug: string }>(useRouter());

  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState<string>(note?.title || "");
  const [text, setText] = useState<string>(note?.text || "");

  const handleEditTitle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!note) {
        return;
      }

      setTitle(event.target.value);
      editTitle(note.id, event.target.value);
    },
    [editTitle, note]
  );

  const handleEditText = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (!note) {
        return;
      }

      setText(event.target.value);
      editText(note.id, event.target.value);
    },
    [editText, note]
  );

  // current page note
  // the slug might also be an ID, so here i'm also searching for note with ID
  useEffect(() => {
    const [currentNote] = notes.filter(
      (note) => note.slug === router.query.slug || note.id === router.query.slug
    );

    if (!currentNote) {
      router.push("/app/404");
      return;
    }

    setNote(currentNote);
    setTitle(currentNote?.title || "");
    setText(currentNote?.text || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, router.query.slug]);

  const formattedDate = useMemo(() => {
    if (note) {
      const date = note.createdAt.toZonedDateTime({
        calendar: Temporal.Calendar.from("gregory"),
        timeZone: new Temporal.TimeZone("America/Sao_Paulo"),
      });

      const format = (options: Intl.DateTimeFormatOptions) =>
        new Intl.DateTimeFormat("pt-BR", options).format(date);

      const formattedHours = format({
        // dateStyle: "full",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
      });

      const day = format({
        day: "2-digit",
      });

      const month = pipeline<string>(
        format({
          month: "short",
        }),
        capitalizeFirstLetter
      );

      const year = format({
        year: "numeric",
      });

      return `${day} ${month} ${year}, ${formattedHours}`;
    }
  }, [note]);

  return (
    <div>
      {note && (
        <React.Fragment>
          <div>
            <input
              type="text"
              placeholder="Enter a title"
              value={title}
              onChange={handleEditTitle}
            />
          </div>
          <div>
            <small>{formattedDate && formattedDate}</small>
          </div>

          <div>
            <textarea value={text} onChange={handleEditText}>
              {text}
            </textarea>
          </div>

          <div>
            <Link href="/app">
              <a>back arrow</a>
            </Link>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Note;
