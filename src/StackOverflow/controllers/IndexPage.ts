import { StackOverflow } from './StackOverflow'
import { Index } from '../models/Index'

export class IndexPage extends StackOverflow {

    public questionSummary = async (page: any) => {
        
        const questions = await new Index(page).collect()
        return questions
    }
}