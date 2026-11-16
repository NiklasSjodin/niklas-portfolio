type SkillListProps = {
  skills: readonly string[];
  /** Optional id for the list when referenced by `aria-labelledby`. */
  id?: string;
};

export function SkillList({ skills, id }: SkillListProps) {
  if (skills.length === 0) return null;

  return (
    <ul
      id={id}
      className="mt-8 flex flex-wrap gap-3"
      aria-label="Skills and technologies"
    >
      {skills.map((skill) => (
        <li
          key={skill}
          className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-text-muted"
        >
          {skill}
        </li>
      ))}
    </ul>
  );
}