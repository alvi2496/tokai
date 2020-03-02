import { TextProcessor } from '../../utils/TextProcessor'

export class PdfDocument {

    doc: any
    textProcessor: any

    constructor(doc: any) {
        this.doc = doc
        this.textProcessor = new TextProcessor()
    }
}