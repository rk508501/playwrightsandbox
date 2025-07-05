import { test } from '@playwright/test';
import fs from 'fs';

test('Download quotes from Goodreads pages 10-100', async ({ page }) => {
  const allQuotes: { text: string | undefined; author: string | undefined }[] = [];

  for (let i = 10; i <= 100; i++) {
    await page.goto(`https://www.goodreads.com/quotes?page=${i}`);
    const quotes = await page.$$eval('.quote', (nodes) =>
      nodes.map((node) => {
        const text = (node.querySelector('.quoteText') as HTMLElement | null)?.innerText.trim().replace(/\n/g, ' ');
        const author = (node.querySelector('.authorOrTitle') as HTMLElement | null)?.innerText.trim();
        return { text, author };
      }),
    );
    allQuotes.push(...quotes);
  }

  fs.writeFileSync('goodreads-quotes.json', JSON.stringify(allQuotes, null, 2), 'utf-8');
  console.log(`Downloaded ${allQuotes.length} quotes to goodreads-quotes.json`);
});
