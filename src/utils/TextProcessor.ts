export class TextProcessor {

    constructor(){}

    public process = async (text: string) => {
        text = await text.replace(/.:-(<([^>]+)>)/ig, '')
        text = await text.replace(/\n\t/ig, '').replace(/\s+/g, " ")
        text = await text.trim()
        return text
    }

}