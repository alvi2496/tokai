import { StackOverflow } from "./StackOverflow";

export class Answer extends StackOverflow{

    private getBody = async () => {
        const answerBlocks: any = this.$('.answer')
        const body: any = []
        for(let answerBlock of answerBlocks) {
            let text = ''
            const answerParagraphs: any = this.$(answerBlock).find('.post-text')
            for(let paragraph of answerParagraphs)
                text = text + ' ' + await this.textProcessor.process(this.$(paragraph).find('p').text())
            body.push({ text })
        }
        return body
    }

    public collect = async () => {
        const body = await this.getBody()
        return body
    }
}