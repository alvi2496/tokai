import { Scraper } from './controllers/Scraper'
import { Saver } from '../utils/Saver'

new Scraper().scrape().then((data: any) => {
    new Saver(data).toTxt(process.cwd() + '/data/PdfDocument')
})

// new Scraper().fonts('2.pdf').then((fonts: any) => {
//     console.log(fonts)
// })
