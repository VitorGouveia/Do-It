import type { NextPage } from "next";
import Link from "next/link";

const NoteNotFound: NextPage = () => {
  return (
    <div>
      <p>bruh did not find note</p>

      <Link href="/app">
        <a> bruh go back</a>
      </Link>
    </div>
  );
};

export default NoteNotFound;
