import { StackOverflow } from "./StackOverflow";

export class Question extends StackOverflow{

    private getHeader = async () => {
        const questionHeader = this.$('#question-header').find('.question-hyperlink').text()
        return questionHeader
    }

    private getUrl = async () => {
        const questionUrl = this.$('.question-hyperlink').attr('href')
        return questionUrl
    }

    private getBody = async () => {
        const questionParagraphs: any = this.$('.question').find('.post-text')
        let body: string = ''
        for(let paragraph of questionParagraphs){
            body = body + ' ' + await this.textProcessor.process(this.$(paragraph).find('p').text())
        }
        return body
    }

    public collect = async () => {
        const header = await this.getHeader()
        const url = await this.getUrl()
        const body = await this.getBody()
        return { header, url, body }
    }
}