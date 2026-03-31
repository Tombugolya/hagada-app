import type { HaggadahSection } from './haggadah';

/** Builds the props for SectionText from a HaggadahSection, including Hebrew fields */
export function sectionTextProps(section: HaggadahSection) {
  return {
    instructions: section.instruction,
    instructionsHe: section.instructionHe,
    blessingHebrew: section.blessingHebrew,
    blessing: section.blessing,
    blessingEnglish: section.blessingEnglish,
    body: section.content.join('\n\n'),
    bodyHe: section.contentHe?.join('\n\n'),
    commentary: section.commentary,
    commentaryHe: section.commentaryHe,
  };
}
