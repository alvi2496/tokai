export class TextProcessor {

    constructor(){}

    public process = async (text: string) => {
        let processedText = await text.replace(/(<([^>]+)>)/ig, '')
        processedText = await processedText.replace(/(<([^>]+)>)/ig, '')
        return processedText
    }

}