import { Scraper } from "./controllers/Scraper"

new Scraper().ScrapeCSV().then(() => {
    console.log("Done")
})