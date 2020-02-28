export class TextProcessor {

    constructor(){}

    public process = async (text: string) => {
        text = await text.replace(/(<([^>]+)>)/ig, '')
        text = await text.replace(/\n\t/ig, '')
        return text
    }

}