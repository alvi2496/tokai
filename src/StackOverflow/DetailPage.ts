import { StackOverflow } from './StackOverflow'
import cheerio from 'cheerio'

export class DetailPage extends StackOverflow {
    
    public questionDetail = async (page: any) => {
        const $ = cheerio.load(page)
        const questionHeader = $('#question-header').find('.question-hyperlink').text()
        const questionUrl = $('.question-hyperlink').attr('href')
        const questionParagraphs: any = $('.question').find('.post-text')
        const answerBlocks: any = $('.answer')
        let question: string = ''
        const answers: any = []
        for(let paragraph of questionParagraphs){
            question = question + ' ' + $(paragraph).find('p').text()
        }
        for(let answerBlock of answerBlocks) {
            let text = ''
            const comments: any = []
            const answerParagraphs: any = $(answerBlock).find('p')
            const commentParagraphs: any = $(answerBlock).find('.comments').find('li')
            for(let paragraph of commentParagraphs) {
                const comment: string = $(paragraph).find('.comment-copy').text()
                comments.push({text: comment})
            }
            for(let paragraph of answerParagraphs) {
                text = text + ' ' + $(paragraph).text()
            }
            answers.push({text, comments}) 
        }
        const questionDetail = {
            questionHeader,
            questionUrl,
            question,
            answers
        }

        return questionDetail
    }
}