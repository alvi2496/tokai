import cheerio from 'cheerio'
import { TextProcessor } from '../../utils/TextProcessor'

export class StackOverflow{

    public page: any
    public $: any
    public textProcessor: any 

    constructor (page: any) {
        this.page = page
        this.$ = cheerio.load(this.page)
        this.textProcessor = new TextProcessor()
    }
}