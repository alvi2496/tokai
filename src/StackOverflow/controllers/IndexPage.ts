import { StackOverflow } from './StackOverflow'
import { Index } from '../models/Index'

export class IndexPage extends StackOverflow {

    public questionSummary = async () => {
        
        let questions: any = await new Index(this.page).collect()
        return questions
    }
}