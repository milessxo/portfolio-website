import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer>
      <p><strong>ASY</strong> &copy; {new Date().getFullYear()}</p>
      <nav aria-label="Footer navigation">
        <a href="#home">Top</a>
        <a href="#projects">Projects</a>
        <a href={`mailto:${profile.email}`}>Contact</a>
      </nav>
      <p className="asset-note">
        Temporary fan-art mascot. No affiliation implied.
      </p>
    </footer>
  );
}
