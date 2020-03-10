import { Scraper } from './controllers/Scraper'

// First step: Scrape the text from the pdfs
// new Scraper().scrape().then((data: any) => {
//     // Second step: Scrape the data
//     new TextProcessor(data).processText().then((data) => {
//         // Third step: Save the data to txt file
//         new Saver(data).toTxt(process.cwd() + '/data/PdfDocument')
//     })
// })
