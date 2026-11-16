/** Professional stack and focus areas for the home and About pages. */
export const professionalSkills = [
  "C# / .NET",
  "Backend & APIs",
  "Azure Functions",
  "Docker",
  "SQL / PostgreSQL",
  "Azure DevOps (CI/CD)",
  "System integrations",
  "Automated testing",
] as const;

export type ProfessionalSkill = (typeof professionalSkills)[number];