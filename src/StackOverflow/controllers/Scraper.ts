import * as data from '../data/tags.json'
import { IndexPage } from "./IndexPage"
import { DetailPage } from "./DetailPage"
import { Fetcher } from "../../utils/Fetcher"
import { TextProcessor } from '../../utils/TextProcessor'
import { Saver } from '../../utils/Saver'

export class Scraper {

    baseUrl: string

    constructor(){
        this.baseUrl = 'https://stackoverflow.com'
    }

    public scrape = async () => {
        const logHead: string = `Starting Parsing on ${new Date().toDateString()} at ${new Date().toTimeString()}\n`
        await new Saver(logHead).toLog('StackOverflow')
        const textProcessor = new TextProcessor()
        for(let category of data.categories) {
            for(let tag of category.tags){
                let url: any = tag.url
                while(url !== undefined && url !== null) {
                    let rows: any = []
                    console.log(`Parsing data from ${url}`)
                    await new Saver(`Parsing data from ${url}\n`).toLog('StackOverflow')
                    let indexPage = await new Fetcher(url).fetchPage()
                    let questionSummary = await new IndexPage(indexPage).questionSummary()
                    for(let question of questionSummary.questions) {
                        let textProcessor: any = new TextProcessor()
                        let detailPage = await new Fetcher(this.baseUrl + question.href).fetchPage()
                        let questionDetail = await new DetailPage(detailPage).questionDetail()
                        let questionText: any = questionDetail.question.header + " " + questionDetail.question.body
                        let answerText: any = await questionDetail.answers.map((answer: { text: string }) => answer.text).join(" ")
                        let commentText: any = await questionDetail.comments.map((comment: {text: string}) => comment.text).join(" ")

                        // process the texts
                        questionText = await textProcessor.process(questionText)
                        answerText = await textProcessor.process(answerText)
                        commentText = await textProcessor.process(commentText)
                        rows.push({
                            url: question.href,
                            question: questionText,
                            answer: answerText,
                            comment: commentText,
                            tag: tag.name,
                            label: category.label
                        })
                        textProcessor = null
                        detailPage = null
                        questionDetail = null
                        questionText = null
                        answerText = null
                        commentText = null
                    }
                    await new Saver(rows).toCsv(process.cwd() + '/data/StackOverflow')
                    rows = null
                    indexPage = null
                    url = questionSummary.nextPageUrl === undefined ? null : this.baseUrl + questionSummary.nextPageUrl
                    questionSummary = null
                }
            }
        }
    }
} 