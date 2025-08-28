import express from "express";
import { metaDataScraper } from "../controllers/scraper.controller";

const router = express.Router();

router.post("/scrape-metadata", metaDataScraper);

export default router;
