import * as data from '../data/sources.json'
import { Saver } from "../../utils/Saver"
import { Reader } from "../../utils/Reader"
import { Dictionary, Literature, TextProcessor } from "../../utils/TextProcessor"
const cliProgress = require('cli-progress')

export class Scraper {

    constructor(){}

    public ScrapeCSV = async () => {
        const logHead: string = `Starting Parsing on ${new Date().toDateString()} at ${new Date().toTimeString()}\n`
        await new Saver(logHead).toLog('StackOverflow')
        const dictionary = await new Dictionary().create()
        let literature: any = await new Literature().create()
        const textProcessor = new TextProcessor()
        const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
        for(let category of data.categories){
            const infile: any = await new Reader(category.path).readLargeCsv()
            let data_length = infile.length
            let extra = data_length % 10
            let chunk = (data_length - extra) / 10
            let rows: any = []
            await bar.start(infile.length, 0)
            let done = 0
            for(let line of infile) {
                await rows.push(await textProcessor.process(line, dictionary, literature))
                if(rows.length === chunk){
                    await new Saver(rows).toCsv(process.cwd() + '/data/github', false)
                    rows = []
                    done += chunk
                    if((data_length - done) < chunk){
                        chunk = extra
                    }
                    await bar.update(done)
                }
            }
            bar.stop()
            console.log(category.type + " done")
        }
    }
}