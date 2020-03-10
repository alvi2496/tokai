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
        await new Saver('"url","question","answer","comment","tag","label"\n').toLine('StackOverflow/data.csv')
        const tp = new TextProcessor()
        for(let category of data.categories) {
            for(let tag of category.tags){
                let url: any = tag.url
                while(url !== undefined && url !== null) {
                    let rows = []
                    console.log(`Parsing data from ${url}`)
                    await new Saver(`Parsing data from ${url}\n`).toLog('StackOverflow')
                    let indexPage = await new Fetcher(url).fetchPage()
                    let questionSummary: any = await new IndexPage(indexPage).questionSummary()
                    for(let question of questionSummary.questions) {
                        let detailPage = await new Fetcher(this.baseUrl + question.href).fetchPage()
                        let questionDetail: any = await new DetailPage(detailPage).questionDetail()
                        let questionText: string = await tp.processText(questionDetail.question.header + " " + questionDetail.question.body)
                        let answerText: string = await tp.processText(await questionDetail.answers.map((answer: { text: string }) => answer.text).join(" "))
                        let commentText: string = await tp.processText(await questionDetail.comments.map((comment: {text: string}) => comment.text).join(" "))
                        
                        rows.push({
                            url: question.href,
                            question: questionText,
                            answer: answerText,
                            comment: commentText,
                            tag: tag.name,
                            label: category.label
                        })
                        detailPage = ''
                        questionDetail = {}
                        questionText = ''
                        answerText = ''
                        commentText = ''
                    }
                    for(let row of rows) {
                        const r = `"${row.url}","${row.question}","${row.answer}","${row.comment}","${row.tag}","${row.label}"\n`
                        await new Saver(r).toLine('StackOverflow/data.csv')
                    }
                    rows = []
                    url = questionSummary.nextPageUrl === undefined ? null : this.baseUrl + questionSummary.nextPageUrl
                    indexPage = {}
                    questionSummary = {}
                }
            }
        }
    }
} 