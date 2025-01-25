import puppeteer from "puppeteer";
import sharp from "sharp";
import GIFEncoder from "gif-encoder-2";
import { createWriteStream } from "fs";

async function createWebsitePreviewGif(url, outputPath) {
  console.log(`Starting to create GIF preview for ${url}`);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });

  console.log("Navigating to the website...");
  await page.goto(url, { waitUntil: "networkidle0" });

  const encoder = new GIFEncoder(640, 360); // Reduced size for the GIF
  encoder.setDelay(1000); // 1 second delay between frames
  encoder.start();

  console.log("Capturing screenshots...");
  for (let i = 0; i < 5; i++) {
    const screenshot = await page.screenshot({ type: "png" });
    const resizedImage = await sharp(screenshot).resize(640, 360).toBuffer();
    encoder.addFrame(resizedImage);
    await page.evaluate(() => window.scrollBy(0, 200)); // Scroll down a bit
    await page.waitForTimeout(1000); // Wait for 1 second
  }

  encoder.finish();

  const outputStream = createWriteStream(outputPath);
  encoder.createReadStream().pipe(outputStream);

  await browser.close();

  console.log(`GIF preview created successfully at ${outputPath}`);
}

// Usage
const websiteUrl = "https://kelick-alpha.vercel.app/"; // Replace with your website URL
const outputFilePath = "./website-preview.gif";

createWebsitePreviewGif(websiteUrl, outputFilePath).catch(console.error);
