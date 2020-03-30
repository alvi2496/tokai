import * as data from '../data/filePath.json'
import { Reader } from '../../utils/Reader'
import { TextProcessor, Dictionary, Literature } from '../../utils/TextProcessor'
import { Saver } from '../../utils/Saver'

export class Scraper {

    constructor() {}

    public scrape = async () => {
        const logHead: string = `Starting Parsing on ${new Date().toDateString()} at ${new Date().toTimeString()}\n`
        await new Saver(logHead).toLog('csvDocument')
        const dictionary = await new Dictionary().create()
        let literature: any = await new Literature().create()
        const textProcessor = new TextProcessor()
        for(let file of data.files) {
            console.log(`Processing ${file.name}.csv`)
            let rows: any = await new Reader(file.path).readCsv(true)
            for(let row of rows) {
                row.text = await textProcessor.process(row.text, dictionary, literature)
            }
            await new Saver(rows).toCsv(process.cwd() + '/data/csvDocument', true, file.name)
        }
    }
}