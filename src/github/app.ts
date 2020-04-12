import { Scraper } from "./controllers/Scraper"

new Scraper().ScrapeCSV().then(() => {
    console.log("File processing done!")
})