import { redirect } from "next/navigation";

// The site is docs-only: the root opens the docs, which open the first page.
export default function Home() {
  redirect("/docs");
}
