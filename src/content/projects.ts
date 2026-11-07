import type { Project } from "@/types/project";

/**
 * Portfolio projects, in the order they appear on `/projects`.
 *
 * To replace a sample: edit the fields, set `sample` to false, delete
 * `outline`, and add `links` only when a real repository or demo exists.
 * Notes can reference a project by putting its slug in `relatedProjects`.
 * Unknown slugs are ignored.
 */
export const projects: readonly Project[] = [
  {
    slug: "developer-assistant",
    title: "Developer Assistant",
    summary:
      "Sample entry. A developer productivity and automation project, still to be written up.",
    description:
      "Sample outline for Developer Assistant, a project about developer productivity and automation. The real scope, stack and links are not written yet.",
    status: "in-progress",
    sample: true,
    tags: ["automation", "developer-tools"],
    outline: [
      "The problem it is meant to help with.",
      "What exists today, if anything.",
      "The stack, and how it is run.",
      "A repository or demo link, once there is one.",
    ],
  },
  {
    slug: "smart-home-automation",
    title: "Smart Home Automation",
    summary:
      "Sample entry. A project exploring practical home automation and integrations, still to be written up.",
    description:
      "Sample outline for Smart Home Automation, a project exploring practical home automation and integrations. The real setup and results are not written yet.",
    status: "experiment",
    sample: true,
    tags: ["home-assistant", "automation"],
    outline: [
      "What is being explored, and what should stay manual.",
      "What actually runs today, if anything.",
      "Devices, protocols and where it is hosted.",
      "What changed after using it for a while.",
    ],
  },
];
