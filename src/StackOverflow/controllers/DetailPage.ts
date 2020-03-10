import { Question } from '../models/Question'
import { Answer } from '../models/Answer'
import { Comment } from '../models/Comment'
import { StackOverflow } from './StackOverflow'

export class DetailPage extends StackOverflow {
    
    public questionDetail = async () => {

        let question: any = await new Question(this.page).collect()
        let answers: any = await new Answer(this.page).collect()
        let comments: any = await new Comment(this.page).collect()

        let questionDetail: any = {
            question,
            answers,
            comments
        }
        question = answers = comments = null
        return questionDetail
    }
}