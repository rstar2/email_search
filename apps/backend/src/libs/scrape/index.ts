import puppeteer from "puppeteer";
import dotenv from "dotenv-safe";

import { wait } from "utils";

// always load the global single .env file
dotenv.config({ allowEmptyValues: true, debug: true });

const EMAIL = process.env.SCRAPE_EMAIL;
const PASSWORD = process.env.SCRAPE_PASSWORD;

(async () => {
    // Launch the browser
    const browser = await puppeteer.launch({ headless: false });

    // Create a page
    const page = await browser.newPage();

    // Go to your site
    await page.goto("https://www.abv.bg");

    await page.waitForNetworkIdle();
    await page.waitForSelector("#username");
    await page.waitForSelector("#password");

    await wait(2000);

    // await page.type(`input[name="username"]`, EMAIL);
    // await page.type(`input[name="password"]`, PASSWORD);
    // // the click is not working for some reason
    // await Promise.all([
    //     page.waitForNavigation({ timeout: 10000 }),
    //     page.click(`input[type="submit"]`),
    // ]);

    // so work directly in the page's context
    await page.evaluate(() => {
        (document.querySelector(`input[name="username"]`) as HTMLInputElement).value = EMAIL;
        (document.querySelector(`input[name="password"]`) as HTMLInputElement).value = PASSWORD;
        (document.querySelector(`input[type="submit"]`) as HTMLInputElement).click();
    });
    await page.waitForNavigation({ timeout: 5000 });

    // Folders selector                -> `table.abv-foldersTable .foldersRow .foldersCell > div`
    //          when selected             `table.abv-foldersTable .foldersRow .foldersCell.foldersSelectedCell > div`

    // Emails table selector           -> `.inbox-cellTableWidget`
    //   Email selector                -> `.inbox-cellTableWidget tr`
    //         when unread                `.inbox-cellTableWidget tr.unread`
    //   Email-Title column selector   -> `td.inbox-cellTableSecondColumn`
    //   Email-Subject column selector -> `td.inbox-cellTableSubjectColumn`
    //   Pager next-page selector      -> `.abv-pager .next`
    //         when disabled              `.abv-pager .next.disable`

    //   Inside Email content          -> `.abv-MessagePanel`

    // for testing leave it open
    await wait(1000000000);

    // Close browser.
    await browser.close();
})();
