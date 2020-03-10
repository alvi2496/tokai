import { Scraper } from './controllers/Scraper'
import { Saver } from '../utils/Saver'
import { TextProcessor } from '../utils/TextProcessor'

const scraper = new Scraper()

// step 1: Scrape the data from Stack Overflow
// scraper.scrape().then((data) => {
//     // step 2: process the data
//     new TextProcessor(data).processCsv().then((data) => {
//         // step 3: save the data to csv file
//         new Saver(data).toCsv(process.cwd() + '/data/StackOverflow')
//     })
// })

new Scraper().scrape().then(() => {
    console.log('File was saved!')
})
