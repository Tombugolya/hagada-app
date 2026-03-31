/**
 * Haggadah Image Generator
 *
 * Generates beautiful AI illustrations for each section of the Haggadah
 * using OpenAI's image generation API.
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... npx tsx scripts/generate-images.ts
 *
 * Setup:
 *   1. Go to https://platform.openai.com/signup
 *   2. Add billing: https://platform.openai.com/account/billing
 *   3. Create API key: https://platform.openai.com/api-keys
 *   4. Run this script with the key as shown above
 *
 * Cost: ~$1-2 for all images
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = process.env.OPENAI_API_KEY;

if (!API_KEY) {
  console.error(`
╔════════════════════════════════════════════════════╗
║  OpenAI API Key Required                          ║
╠════════════════════════════════════════════════════╣
║                                                    ║
║  Set your API key:                                ║
║  OPENAI_API_KEY=sk-... npx tsx scripts/generate-images.ts  ║
║                                                    ║
║  Don't have one? Follow these steps:              ║
║  1. Go to https://platform.openai.com/signup      ║
║  2. Add billing at /account/billing               ║
║  3. Create key at /api-keys                       ║
║                                                    ║
║  Note: ChatGPT Plus subscription does NOT include ║
║  API access. They are separate.                   ║
║                                                    ║
║  Cost: ~$1-2 for all images                       ║
╚════════════════════════════════════════════════════╝
`);
  process.exit(1);
}

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'generated');

const STYLE_PREFIX = 'In the style of an illuminated medieval Haggadah manuscript with watercolor, gold leaf accents, and rich jewel tones. Beautiful and detailed illustration of';

const IMAGE_PROMPTS: Record<string, string> = {
  'kadesh': `${STYLE_PREFIX} a ornate silver Kiddush cup overflowing with deep red wine, surrounded by lit Shabbat candles and a beautifully set Seder table with a white tablecloth, matzah, and flowers.`,
  'urchatz': `${STYLE_PREFIX} hands being ritually washed with water pouring from a decorative copper vessel, with droplets catching golden light.`,
  'karpas': `${STYLE_PREFIX} fresh green parsley being dipped into a bowl of salt water, with spring flowers and herbs surrounding the scene, symbolizing springtime renewal and tears.`,
  'yachatz': `${STYLE_PREFIX} three matzot stacked on a beautiful cloth, with the middle matzah being broken in two, crumbs scattering like golden dust.`,
  'maggid-opening': `${STYLE_PREFIX} an ancient scroll being unrolled revealing the story of the Exodus, with Egyptian pyramids in the background and a starry desert sky.`,
  'four-questions': `${STYLE_PREFIX} a young child at a Seder table asking questions, looking up with wonder, surrounded by family members listening attentively.`,
  'four-sons': `${STYLE_PREFIX} four distinct figures representing the Four Sons of the Haggadah: a wise scholar with books, a defiant rebel, a simple innocent soul, and a quiet child, each in ornate frames.`,
  'ten-plagues': `${STYLE_PREFIX} the ten plagues of Egypt shown as small vignettes: blood-red water, frogs, darkness over pyramids, with a dramatic sky.`,
  'dayenu': `${STYLE_PREFIX} the Israelites crossing the parted Red Sea with walls of water on both sides, walking on dry land under a pillar of fire, in triumph and joy.`,
  'slavery': `${STYLE_PREFIX} the Israelites laboring under the Egyptian sun, building with bricks and mortar, with pyramids rising in the background, showing both hardship and resilience.`,
  'maror': `${STYLE_PREFIX} a bundle of bitter herbs (horseradish root and romaine lettuce) arranged artistically on a Seder plate, with tears glistening like jewels.`,
  'korech': `${STYLE_PREFIX} a sandwich of matzah, maror, and charoset being assembled, showing the layers, in the tradition of Hillel.`,
  'afikoman': `${STYLE_PREFIX} a piece of matzah wrapped in a decorated cloth, hidden among cushions and pillows, with a child peeking around looking for it.`,
  'elijah': `${STYLE_PREFIX} an ornate golden goblet (Cup of Elijah) filled with wine, a door opening to reveal a starry night sky, with the prophet Elijah arriving as a mystical figure.`,
  'hallel': `${STYLE_PREFIX} joyous singing and praise, with musical notes made of gold floating upward, a sunrise over Jerusalem's golden walls.`,
  'nirtzah': `${STYLE_PREFIX} a golden Jerusalem skyline at dawn, with the words "Next Year in Jerusalem" glowing, doves flying, and olive branches framing the scene.`,
  'seder-plate': `${STYLE_PREFIX} a complete Seder plate from above, showing all six items: shank bone, egg, bitter herbs, charoset, karpas, and chazeret, arranged on an ornate plate with Hebrew labels.`,
};

async function generateImage(name: string, prompt: string): Promise<void> {
  console.log(`\n🎨 Generating: ${name}...`);

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-image-1',
      prompt,
      n: 1,
      size: '1536x1024',
      quality: 'medium',
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error(`  ❌ Failed: ${error.error?.message || 'Unknown error'}`);
    return;
  }

  const data = await response.json() as { data: Array<{ b64_json: string }> };
  const imageData = data.data[0].b64_json;

  const filePath = path.join(OUTPUT_DIR, `${name}.png`);
  fs.writeFileSync(filePath, Buffer.from(imageData, 'base64'));
  console.log(`  ✅ Saved: ${filePath}`);
}

async function main() {
  console.log('🕎 Haggadah Image Generator');
  console.log('══════════════════════════════\n');

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const entries = Object.entries(IMAGE_PROMPTS);
  console.log(`Generating ${entries.length} images...\n`);

  // Generate images sequentially to avoid rate limits
  for (const [name, prompt] of entries) {
    await generateImage(name, prompt);
    // Small delay to avoid rate limits
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log('\n\n✨ All done! Images saved to public/images/generated/');
  console.log(`   Generated ${entries.length} illustrations for your Haggadah.`);
}

main().catch(console.error);
