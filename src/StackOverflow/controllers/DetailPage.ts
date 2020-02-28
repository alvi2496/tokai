import { Question } from '../models/Question'
import { Answer } from '../models/Answer'

export class DetailPage {
    
    public questionDetail = async (page: any) => {
        const question = await new Question(page).collect()
        const answers = await new Answer(page).collect()
        // const answerBlocks: any = $('.answer')
        // const answers: any = []
        // for(let answerBlock of answerBlocks) {
        //     let text = ''
        //     const comments: any = []
        //     const answerParagraphs: any = $(answerBlock).find('.post-text')
        //     const commentParagraphs: any = $(answerBlock).find('.comments').find('li')
        //     for(let paragraph of commentParagraphs) {
        //         const comment: string = await textProcessor.process($(paragraph).find('.comment-copy').text())
        //         comments.push({text: comment})
        //     }
        //     for(let paragraph of answerParagraphs) {
        //         text = text + ' ' + await textProcessor.process($(paragraph).find('p').text())
        //     }
        //     answers.push({text, comments}) 
        // }
        const questionDetail = {
            question,
            answers
        }

        return questionDetail
    }
}