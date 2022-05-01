import { useEffect, useMemo, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContextSelector } from "use-context-selector";

import { useTypeSafeRouter } from "../../hooks/use-type-safe-router";
import { Note, NotesContext } from "../../context/notes";

const Note: NextPage = () => {
  const [note, setNote] = useState<Note | null>(null);
  const notes = useContextSelector(NotesContext, (context) => context.notes);

  const router = useTypeSafeRouter<{ slug: string }>(useRouter());

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
  }, [notes, router, router.query.slug]);

  return <div>{JSON.stringify(note, null, 2)}</div>;
};

export default Note;
