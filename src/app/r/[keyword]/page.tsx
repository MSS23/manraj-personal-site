import { redirect } from "next/navigation";
import { getNoteByKeyword } from "@/lib/notes";

type Params = { keyword: string };

/** manrajssidhu.com/r/<keyword>: the short link the comment-keyword DM sends. An unknown word lands on the list. */
export default async function KeywordRedirect({ params }: { params: Promise<Params> }) {
  const note = getNoteByKeyword(decodeURIComponent((await params).keyword));
  redirect(note ? `/notes/${note.slug}#guide` : "/r");
}
