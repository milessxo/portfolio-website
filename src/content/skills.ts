import type { Skill } from "@/types/content";

export const skills: Skill[] = [
  ["JavaScript", "Language", "JS"], ["Python", "Language", "PY"],
  ["React", "Frontend", "RE"], ["React Native", "Mobile", "RN"],
  ["Node.js", "Backend", "NO"], ["Express", "Backend", "EX"],
  ["HTML", "Frontend", "HT"], ["CSS", "Frontend", "CS"],
  ["MySQL", "Data", "MY"], ["SQL", "Data", "SQ"],
  ["MongoDB", "Data", "MO"], ["Mongoose", "Data", "MG"],
  ["Firebase", "Platform", "FB"], ["Figma", "Design", "FI"],
  ["Adobe Illustrator", "Design", "AI"],
].map(([name, category, glyph]) => ({ name, category, glyph }));
