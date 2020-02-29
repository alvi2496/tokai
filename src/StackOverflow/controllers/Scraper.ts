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
            {
                name: 'design-patterns',
                url: 'https://stackoverflow.com/questions/tagged/design-patterns',
                limit: 1880
            },
            // {
            //     name: 'software-design',
            //     url: 'https://stackoverflow.com/questions/tagged/software-design',
            //     limit: 97
            // },
            // {
            //     name: 'class-design',
            //     url: 'https://stackoverflow.com/questions/tagged/class-design',
            //     limit: 70
            // },
            // {
            //     name: 'design-principles',
            //     url: 'https://stackoverflow.com/questions/tagged/design-principles',
            //     limit: 18
            // },
            // {
            //     name: 'system-design',
            //     url: 'https://stackoverflow.com/questions/tagged/system-design',
            //     limit: 16
            // },
            // {
            //     name: 'application-design',
            //     url: 'https://stackoverflow.com/questions/tagged/application-design',
            //     limit: 15
            // },
            // {
            //     name: 'code-design',
            //     url: 'https://stackoverflow.com/questions/tagged/code-design',
            //     limit: 11
            // }
        ]
    }

    public scrape = async () => {
        const data: any = []
        for(let tag of this.tags){
            const indexPage = await new Fetcher(tag.url).fetchPage()
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
                    comment: commentText
                })
            }
        }
        return data 
    }
} 