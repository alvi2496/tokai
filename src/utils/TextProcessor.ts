import Stopword from 'stopword'

export class TextProcessor {

    constructor(){}

    public process = async (text: string) => {
        // remove all the punctuations and symbols
        text = await text.replace(/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\”|\“|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|•|©|®|–|〉|=)/g, '')
        // remove all the new lines and tabs
        text = await text.replace(/\n\t/ig, '').replace(/\s+|\'|\’/g, " ")
        // remove all the words with length < 3
        text = await text.replace(/(\b(\w{1,3})\b(\s|$))/g,'')
        // remove all the numbers
        text = await text.replace(/[0-9]/g, '')
        // lowercase and trim any leading or trailing spaces
        text = await text.toLowerCase().trim()
        // remove stopwords
        text = await this.removeStopwords(text)

        return text
    }

    public removeStopwords = async (text: string) => {
        const stopWords = [
            'ieee', 'transactions', 'on', 'software', 'engineering', 'university', 'of', 'victoria'
        ]
        for(let word of stopWords) 
            await text.replace(word, '')
        
        let textArray = await text.split(' ')
        textArray = await Stopword.removeStopwords(textArray)
        text = await textArray.join(' ')
        return text
    }

}