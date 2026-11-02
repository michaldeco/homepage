// Slovak typography: a single-letter preposition or conjunction (v, k, s, z, a, o, u, i)
// must not end a line, so it is joined to the next word with a non-breaking space.
// Plain JavaScript, so that astro.config.mjs can import the Markdown plugin.
const singleLetterWord = /(?<=^|[\s(„])([vkszaouiVKSZAOUI]) +/g;

/** @param {string} text */
export const fixSlovakSpacing = (text) => text.replace(singleLetterWord, '$1 ');

/**
 * Markdown plugin for Astro's Sätteri processor: applies the rule to the text of
 * files under src/content/sk/ and leaves every other file out.
 * @param {{ fileURL: URL | undefined }} ctx
 */
export const slovakSpacing = ({ fileURL }) =>
  fileURL?.pathname.includes('/content/sk/') && {
    name: 'slovak-spacing',
    /** @param {{ value: string }} node @param {any} ctx */
    text(node, ctx) {
      const fixed = fixSlovakSpacing(node.value);
      if (fixed !== node.value) ctx.setProperty(node, 'value', fixed);
    },
  };

// For texts that don't go through Markdown (frontmatter, YAML): Slovak spacing on Slovak pages only.
/** @param {string} lang @returns {(text: string) => string} */
export const typographyFor = (lang) => (lang === 'sk' ? fixSlovakSpacing : (text) => text);
