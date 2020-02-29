import { Scraper } from './controllers/Scraper'

const scraper = new Scraper()
scraper.scrape().then((data) => {
    console.log(data)
})

