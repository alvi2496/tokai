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
        const rows: any = []
        for(let category of data.categories) {
            for(let tag of category.tags){
                let url: any = tag.url
                while(url !== undefined && url !== null) {
                    console.log(`Parsing data from ${url}`)
                    await new Saver(`Parsing data from ${url}\n`).toLog('StackOverflow')
                    let indexPage = await new Fetcher(url).fetchPage()
                    const questionSummary = await new IndexPage(indexPage).questionSummary()
                    for(let question of questionSummary.questions) {
                        let detailPage = await new Fetcher(this.baseUrl + question.href).fetchPage()
                        let questionDetail = await new DetailPage(detailPage).questionDetail()
                        let questionText: any = questionDetail.question.header + " " + questionDetail.question.body
                        let answerText: any = await questionDetail.answers.map((answer: { text: string }) => answer.text).join(" ")
                        let commentText: any = await questionDetail.comments.map((comment: {text: string}) => comment.text).join(" ")

                        // process the texts
                        questionText = await new TextProcessor().process(questionText)
                        answerText = await new TextProcessor().process(answerText)
                        commentText = await new TextProcessor().process(commentText)
                        rows.push({
                            url: question.href,
                            question: questionText,
                            answer: answerText,
                            comment: commentText,
                            tag: tag.name,
                            label: category.label
                        })
                        detailPage = questionDetail = questionText = answerText = commentText = null
                    }
                    indexPage = null
                    url = questionSummary.nextPageUrl === undefined ? null : this.baseUrl + questionSummary.nextPageUrl
                }
            }
        }
        return rows
    }
} 