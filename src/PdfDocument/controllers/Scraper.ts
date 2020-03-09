import { Reader } from '../../utils/Reader'
import { Text } from '../models/Text'
import fs from 'fs'
import { TextProcessor } from '../../utils/TextProcessor'
import { Saver } from '../../utils/Saver'

export class Scraper {

    fileDir: string

    constructor(){
        this.fileDir = process.cwd() + '/src/PdfDocument/data/'
    }

    public scrape = async () => {
        let text: string = ''
        const logHead: string = `Starting Parsing on ${new Date().toDateString()} at ${new Date().toTimeString()}\n`
        await new Saver(logHead).toLog('PdfDocument')
        const folders = await this.folderNames(this.fileDir)
        let fileNumber: number = 0
        for(let folder of folders) {
            const files = await this.fileNames(this.fileDir + folder)
            for(let file of files){
                console.log(`Parsing from ${file}`)
                await new Saver(`Parsing from ${file}\n`).toLog('PdfDocument')
                const doc = await new Reader(this.fileDir + folder + '/' + file).readPdf()
                const texts = await new Text(doc).collect()
                text = text + ' ' + texts.join(" ")
                fileNumber += 1
            }
        }
        console.log(`${fileNumber} files parsed`)
        return { text: text }
    }

    public fonts = async (docName: any) => {
        const doc = await new Reader(this.fileDir + docName).readPdf()
        const fonts = await new Text(doc).fontNames()
        return new Set(fonts)
    }

    fileNames = async (directoryPath: string) => {
        const files = fs.readdirSync(directoryPath)
        return files
    }

    folderNames = async (directoryPath: string) => {
        const dirs = fs.readdirSync(directoryPath)
        return dirs
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