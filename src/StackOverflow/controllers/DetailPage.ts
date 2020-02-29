import { Question } from '../models/Question'
import { Answer } from '../models/Answer'
import { Comment } from '../models/Comment'
import { StackOverflow } from './StackOverflow'

export class DetailPage extends StackOverflow {
    
    public questionDetail = async () => {

        const question = await new Question(this.page).collect()
        const answers = await new Answer(this.page).collect()
        const comments = await new Comment(this.page).collect()

        const questionDetail = {
            question,
            answers,
            comments
        }

        return questionDetail
    }
}