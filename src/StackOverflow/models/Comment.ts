import { StackOverflow } from "./StackOverflow";

export class Comment extends StackOverflow{

    private getBody = async () => {
        const commentParagraphs: any = this.$('.comments').find('li')
        const comments: any = []
        for(let paragraph of commentParagraphs) {
            const comment: string = await this.$(paragraph).find('.comment-copy').text()
            comments.push({text: comment})
        }
        return comments
    }

    public collect = async () => {
        const comments = await this.getBody()
        return comments
    }
} 