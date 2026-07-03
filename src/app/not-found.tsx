import Link from "next/link";
export default function NotFound() { return <main id="main-content" className="not-found"><p>404 — Lost in the fog</p><h1>This page wandered off.</h1><p>The useful bits are still waiting back at the portfolio.</p><div><Link className="button button--solid" href="/">Return home</Link><Link className="text-link" href="/#projects">View projects</Link></div></main>; }
