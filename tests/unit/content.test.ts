import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { skills } from "@/content/skills";
import { certifications } from "@/content/certifications";

describe("portfolio content", () => {
  it("contains both routable projects", () => { expect(projects.map(p => p.slug)).toEqual(["discord-bot", "study-buddy"]); });
  it("does not include Unity", () => { expect(skills.map(s => s.name)).not.toContain("Unity"); expect(skills).toHaveLength(15); });
  it("keeps unavailable evidence honest", () => { expect(projects.every(p => p.media.some(m => m.placeholder))).toBe(true); expect(certifications.every(c => !c.url)).toBe(true); });
});
