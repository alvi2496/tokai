import { PDFExtract } from 'pdf.js-extract'

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
}