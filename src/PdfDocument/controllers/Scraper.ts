import { Reader } from '../../Reader'
import { Text } from '../models/Text'
import * as data from '../data/docs.json'

export class Scraper {

    fileDir: string
    files: any

    constructor(){
        this.fileDir = process.cwd() + '/src/PdfDocument/data/'
        this.files = data.files
    }

    public scrape = async () => {
        let text: string = ''
        for(let file of this.files){
            // console.log(file)
            const fileInfo = await this.extractFileInfo(file)
            const doc = await new Reader(this.fileDir + fileInfo.name).readPdf()
            const texts = await new Text(doc).collect(fileInfo.fonts)
            text = text + ' ' + texts.join(" ")
        }
        return text
    }

    public fonts = async (docName: any) => {
        const doc = await new Reader(this.fileDir + docName).readPdf()
        const fonts = await new Text(doc).fontNames()
        return new Set(fonts)
    }

    extractFileInfo = async (file: any) => {
        const name = file.name
        const fonts = []
        for(let font of file.fonts) {
            fonts.push(font.name)
        }
        return {
            name,
            fonts
        }
        return {
            name, fonts
        }
    }
}