import * as data from '../data/sources.json'
import { Saver } from "../../utils/Saver"
import { Reader } from "../../utils/Reader"
import { Dictionary, Literature, TextProcessor } from "../../utils/TextProcessor"

export class Scraper {

    constructor(){}

    public ScrapeCSV = async () => {
        const logHead: string = `Starting Parsing on ${new Date().toDateString()} at ${new Date().toTimeString()}\n`
        await new Saver(logHead).toLog('StackOverflow')
        const dictionary = await new Dictionary().create()
        let literature: any = await new Literature().create()
        const textProcessor = new TextProcessor()
        const chunk = 100
        for(let category of data.categories){
            const infile: any = await new Reader(category.path).readCsv()
            let rows: any = []
            for(let line of infile) {
                rows.push(await textProcessor.process(line[0], dictionary, literature))
                if(rows.length === chunk){
                    await new Saver(rows).toCsv(process.cwd() + '/data/github', false)
                    rows = []
                }
            }
        }
    }
}