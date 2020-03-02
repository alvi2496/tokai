import * as data from '../data/tags.json'
import { IndexPage } from "./IndexPage"
import { DetailPage } from "./DetailPage"
import { Fetcher } from "../../utils/Fetcher"

export class Scraper {

    tags: any
    baseUrl: string

    constructor(){
        this.baseUrl = 'https://stackoverflow.com'
        this.tags = data.tags
    }

    public scrape = async () => {
        const data: any = []
        for(let tag of this.tags){
            let url = tag.url
            while(url !== undefined && url !== null) {
                console.log(`Parsing data from ${url}`)
                const indexPage = await new Fetcher(url).fetchPage()
                const questionSummary = await new IndexPage(indexPage).questionSummary()
                for(let question of questionSummary.questions) {
                    const detailPage = await new Fetcher(this.baseUrl + question.href).fetchPage()
                    const questionDetail = await new DetailPage(detailPage).questionDetail()
                    const questionText: string = questionDetail.question.header + " " + questionDetail.question.body
                    const answerText: string = await questionDetail.answers.map((answer: { text: string }) => answer.text).join(" ")
                    const commentText: string = await questionDetail.comments.map((comment: {text: string}) => comment.text).join(" ")
                    data.push({
                        url: question.href,
                        question: questionText,
                        answer: answerText,
                        comment: commentText,
                        tag: tag.name
                    })
                }
                url = questionSummary.nextPageUrl === undefined ? null : this.baseUrl + questionSummary.nextPageUrl
            }
        }
        return data 
    }
} 