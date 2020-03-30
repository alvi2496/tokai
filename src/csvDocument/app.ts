import { Scraper } from './controllers/Scraper'

new Scraper().scrape().then(() => {
    console.log('Job complete')
})