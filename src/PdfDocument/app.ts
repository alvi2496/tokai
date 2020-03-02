// const PDFExtract = require('pdf.js-extract').PDFExtract;
// const pdfExtract = new PDFExtract();
// const options = {}; 
// pdfExtract.extract(process.cwd() + '/src/PdfDocument/data/1.pdf', options, (err: any, data: any) => {
//   if (err) return console.log(err);
//   for(let page of data.pages) {
//       let contents = page.content
//       for(let content of contents) {
//         if(content.fontName === 'g_d0_f3'){
//             console.log(content.str)
//         }
//       }
//   }
// });

// import { Reader } from '../Reader'

// new Reader(process.cwd() + '/src/PdfDocument/data/1.pdf').readPdf().then((doc: any) => {
//     console.log(doc.pages[7])
// })

import { Scraper } from './controllers/Scraper'

new Scraper().scrape().then((texts: any) => {
    console.log(texts)
})

// new Scraper().fonts().then((fonts: any) => {
//     console.log(fonts)
// })


// import fs from 'fs'
// import pdf from 'pdf-parse'

// let dataBuffer = fs.readFileSync(process.cwd() + '/src/PdfDocument/data/1.pdf')

// pdf(dataBuffer).then((data: any) => {
//     console.log(data.text)
// })