import { Question } from '../models/Question'
import { Answer } from '../models/Answer'
import { Comment } from '../models/Comment'
import { StackOverflow } from './StackOverflow'

export class DetailPage extends StackOverflow {
    
    public questionDetail = async (page: any) => {

        const question = await new Question(page).collect()
        const answers = await new Answer(page).collect()
        const comments = await new Comment(page).collect()

        const questionDetail = {
            question,
            answers,
            comments
        }

        return questionDetail
    }
}