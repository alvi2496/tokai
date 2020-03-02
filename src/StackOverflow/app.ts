import { Scraper } from './controllers/Scraper'
import { Saver } from '../utils/Saver'

const scraper = new Scraper()

scraper.scrape().then((data) => {
    new Saver(data).toCsv(process.cwd() + '/data/StackOverflow')
})
