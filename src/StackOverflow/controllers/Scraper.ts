import * as data from '../data/tags.json'
import { IndexPage } from "./IndexPage"
import { DetailPage } from "./DetailPage"
import { Fetcher } from "../../utils/Fetcher"
import { TextProcessor, Dictionary, Literature } from '../../utils/TextProcessor'
import { Saver } from '../../utils/Saver'

export class Scraper {

    baseUrl: string

    constructor(){
        this.baseUrl = 'https://stackoverflow.com'
    }

    public scrape = async () => {
        const logHead: string = `Starting Parsing on ${new Date().toDateString()} at ${new Date().toTimeString()}\n`
        await new Saver(logHead).toLog('StackOverflow')
        const dictionary = await new Dictionary().create()
        let literature: any = await new Literature().create()
        const textProcessor = new TextProcessor()
        let firstChunk = true
        for(let category of data.categories) {
            for(let tag of category.tags){
                let url: any = tag.url
                let limit = 0
                while(url !== undefined && url !== null) {
                    let rows: any = []
                    console.log(`Parsing data from ${url}`)
                    await new Saver(`Parsing data from ${url}\n`).toLog('StackOverflow')
                    try{
                        let indexPage = await new Fetcher(url).fetchPage()
                        let questionSummary = await new IndexPage(indexPage).questionSummary()
                        for(let question of questionSummary.questions) {
                            let detailPage = await new Fetcher(this.baseUrl + question.href).fetchPage()
                            let questionDetail = await new DetailPage(detailPage).questionDetail()
                            let questionText: any = questionDetail.question.header + " " + questionDetail.question.body
                            let answerText: any = await questionDetail.answers.map((answer: { text: string }) => answer.text).join(" ")
                            let commentText: any = await questionDetail.comments.map((comment: {text: string}) => comment.text).join(" ")
    
                            // process the texts
                            questionText = await textProcessor.process(questionText, dictionary, literature)
                            answerText = await textProcessor.process(answerText, dictionary, literature)
                            commentText = await textProcessor.process(commentText, dictionary, literature)
    
                            rows.push({
                                url: question.href,
                                question: questionText,
                                answer: answerText,
                                comment: commentText,
                                tag: tag.name,
                                label: category.label
                            })
                            detailPage = null
                            questionDetail = null
                            questionText = null
                            answerText = null
                            commentText = null
    
                            limit = limit + 1
                        }
                        if(firstChunk){
                            await new Saver(rows).toCsv(process.cwd() + '/data/StackOverflow')
                            firstChunk = false
                        } 
                        else
                            await new Saver(rows).toCsv(process.cwd() + '/data/StackOverflow', false)
                        rows = null
                        indexPage = null
                        url = questionSummary.nextPageUrl === undefined || limit > tag.limit ? null : this.baseUrl + questionSummary.nextPageUrl
                        questionSummary = null
                    } catch(e) {
                        continue
                    }
                }
            }
        }
    }
} 