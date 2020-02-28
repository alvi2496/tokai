import { StackOverflow } from '../models/StackOverflow'
import cheerio from 'cheerio'

export class IndexPage {

    public questionSummary = async (page: any) => {
        const $ = cheerio.load(page)
        const questions: any = $('.question-summary')
        const nextPageUrl = $('.page-numbers.next').parent().attr('href')
        const  summary: any = []
        for(let question of questions) {
            const title = $(question).find('.question-hyperlink').text()
            const href = $(question).find('.question-hyperlink').attr('href')
            summary.push({
                title,
                href
            })
        }
        const questionSummary = {
            summary,
            nextPageUrl
        }
        return questionSummary
    }
}