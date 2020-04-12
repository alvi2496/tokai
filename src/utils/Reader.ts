import { PDFExtract } from 'pdf.js-extract'
import * as csv from 'fast-csv'
import fs from 'fs'
import readline from 'readline'
import stream from 'stream'

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
        let rows: any = []
        return new Promise((resolve, reject) => {
            fs.createReadStream(this.url)
            .pipe(csv.parse({ headers: headers }))
            .on('error', error => reject(error))
            .on('data', (row) => rows.push(row))
            .on('end', () => resolve(rows))
        })
    }

    public readLargeCsv = async () => {
        return new Promise( async (resolve, reject) => {
            fs.readFile(this.url, 'utf8', (err, content) => {
                if(err){
                    reject(err)
                }
                else {
                    const rows = content.split('\n')
                    resolve(rows)
                }
            })
        })
    }
}