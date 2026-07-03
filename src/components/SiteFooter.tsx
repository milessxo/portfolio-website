import { profile } from "@/content/profile";
export function SiteFooter() { return <footer><p>© 2026 Aw Sheng You</p><div><a href={`mailto:${profile.email}`}>Email</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div><p className="asset-note">Hirono-inspired pixel fan art. Hirono © POP MART/Lang; no affiliation implied.</p></footer>; }
