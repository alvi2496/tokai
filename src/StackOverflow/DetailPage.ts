import { StackOverflow } from './StackOverflow'
import cheerio from 'cheerio'
import { TextProcessor } from '../TextProcessor'

export class DetailPage extends StackOverflow {
    
    public questionDetail = async (page: any) => {
        const textProcessor = new TextProcessor()
        const $ = cheerio.load(page)
        const questionHeader = $('#question-header').find('.question-hyperlink').text()
        const questionUrl = $('.question-hyperlink').attr('href')
        const questionParagraphs: any = $('.question').find('.post-text')
        const answerBlocks: any = $('.answer')
        let question: string = ''
        const answers: any = []
        for(let paragraph of questionParagraphs){
            question = question + ' ' + await textProcessor.process($(paragraph).find('p').text())
        }
        for(let answerBlock of answerBlocks) {
            let text = ''
            const comments: any = []
            const answerParagraphs: any = $(answerBlock).find('.post-text')
            const commentParagraphs: any = $(answerBlock).find('.comments').find('li')
            for(let paragraph of commentParagraphs) {
                const comment: string = await textProcessor.process($(paragraph).find('.comment-copy').text())
                comments.push({text: comment})
            }
            for(let paragraph of answerParagraphs) {
                text = text + ' ' + await textProcessor.process($(paragraph).find('p').text())
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