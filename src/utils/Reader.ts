import { PDFExtract } from 'pdf.js-extract'
import * as csv from 'fast-csv'
import fs from 'fs'

export class Reader {
    
    public url: string

    constructor(url: string) {
        this.url = url
    }

    public readPdf = async () => {
        const pdfExtract = new PDFExtract();
        return new Promise((resolve, reject) => {
            pdfExtract.extract(this.url, {}, (err: any, data: any) => {
                if(err){
                    reject(err)
                }
                else {
                    resolve(data)
                }
            })
        })
    }

    public readCsv = async (headers: boolean = false) => {
        return new Promise((resolve, reject) => {
            let rows: any = []
            fs.createReadStream(this.url)
            .pipe(csv.parse({ headers: headers }))
            .on('error', error => reject(error))
            .on('data', row => rows.push(row))
            .on('end', () => resolve(rows))
        })
    }
}