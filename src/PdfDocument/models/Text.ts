import { PdfDocument } from "./PdfDocument"

export class Text extends PdfDocument {

    public collect = async (fontNames: any) => {
        const texts = []
        const pages = this.doc.pages
        for(let page of pages) {
            const contents = page.content
            for(let content of contents) {
                if(fontNames.includes(content.fontName)) {
                    texts.push(await this.textProcessor.process(content.str))
                }
            }
        }
        return texts
    }

    public fontNames = async () => {
        const fonts: any = []
        const pages = this.doc.pages
        for(let page of pages) {
            const contents = page.content
            for(let content of contents) {
                fonts.push(content.fontName)
            }
        }
        return fonts
    }
}