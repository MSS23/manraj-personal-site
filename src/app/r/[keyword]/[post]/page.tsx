import { redirect } from "next/navigation";
import { getNoteByKeyword, getNoteByPost } from "@/lib/notes";

type Params = { keyword: string; post: string };

/** manrajssidhu.com/r/<keyword>/<post>: the DM link. The post (Instagram shortcode or TikTok id) wins, so two reels that
 *  share a keyword each send their own guide; until the site has the post's link, the newest note with the keyword. */
export default async function PostRedirect({ params }: { params: Promise<Params> }) {
  const { keyword, post } = await params;
  const note = getNoteByPost(decodeURIComponent(post)) ?? getNoteByKeyword(decodeURIComponent(keyword));
  redirect(note ? `/notes/${note.slug}#guide` : "/r");
}
