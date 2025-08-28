import urlMetadata from "url-metadata";
import { Request, Response } from "express";

export const metaDataScraper = async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) {
    res.status(400).json({ message: "URL is required" });
    return;
  }

  try {
    const metadata = await urlMetadata(url);
    // Extract the most useful title and description
    const title = metadata["og:title"] || metadata.title || "No Title Found";
    const description =
      metadata["og:description"] ||
      metadata.description ||
      "No Description Found";

    res.json({ title, description });
  } catch (error) {
    console.error("Scraping error:", error);
    res.status(500).json({ message: "Failed to fetch metadata from the URL." });
  }
};
