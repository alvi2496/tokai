import { StackOverflow } from "./StackOverflow";

export class Index extends StackOverflow {

    private getQuestions = async () => {
        const questions: any = this.$('.question-summary')
        const  summary: any = []
        for(let question of questions) {
            const title = this.$(question).find('.question-hyperlink').text()
            const href = this.$(question).find('.question-hyperlink').attr('href')
            summary.push({
                title,
                href
            })
        }
        return summary
    }

    private getNextPageUrl = async () => {
        const nextPageUrl = this.$('.s-pagination.pager.fl').find('.s-pagination--item')
        return nextPageUrl[(nextPageUrl.length - 1).toString()].attribs.href
    }

    public collect = async () => {
        const questions = await this.getQuestions()
        const nextPageUrl = await this.getNextPageUrl()

        return { questions, nextPageUrl }
    }
}