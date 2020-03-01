import { StackOverflow } from "./StackOverflow";
import { IndexPage } from "./IndexPage"
import { DetailPage } from "./DetailPage"
import { Fetcher } from "../../Fetcher"

export class Scraper {

    tags: any
    baseUrl: string

    constructor(){
        this.baseUrl = 'https://stackoverflow.com'
        this.tags = [
            // {
            //     name: 'design-patterns',
            //     url: 'https://stackoverflow.com/questions/tagged/design-patterns?tab=Newest',
            //     limit: 1880
            // },
            // {
            //     name: 'software-design',
            //     url: 'https://stackoverflow.com/questions/tagged/software-design?tab=Newest',
            //     limit: 97
            // },
            // {
            //     name: 'class-design',
            //     url: 'https://stackoverflow.com/questions/tagged/class-design?tab=Newest',
            //     limit: 70
            // },
            // {
            //     name: 'design-principles',
            //     url: 'https://stackoverflow.com/questions/tagged/design-principles?tab=Newest',
            //     limit: 18
            // },
            // {
            //     name: 'system-design',
            //     url: 'https://stackoverflow.com/questions/tagged/system-design?tab=Newest',
            //     limit: 16
            // },
            // {
            //     name: 'application-design',
            //     url: 'https://stackoverflow.com/questions/tagged/application-design?tab=Newest',
            //     limit: 15
            // },
            {
                name: 'code-design',
                url: 'https://stackoverflow.com/questions/tagged/code-design?tab=Newest',
                limit: 11
            }
        ]
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