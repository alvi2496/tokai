import Stopword from 'stopword'
import { Nodehun } from 'nodehun'
import fs from 'fs'

const affix =  fs.readFileSync(`${process.cwd()}/dictionary/en-GB.aff`)
const dictionary = fs.readFileSync(`${process.cwd()}/dictionary/en-GB.dic`)

export class TextProcessor {

    constructor(){}

    public process = async (text: any) => {
        // lowercase and trim any leading or trailing spaces
        text = await text.toLowerCase().trim()
        //remove all the urls
        text = await text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
        // remove all the punctuations and symbols
        text = await text.replace(/(~|`|!|@|#|\$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\”|\“|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|•|©|®|–|〉|=)/g, '')
        // remove all the new lines and tabs
        text = await text.replace(/\n\t/ig, '').replace(/\s+|\'|\’/g, " ")
        // remove all the words with length < 3
        text = await text.replace(/(\b(\w{1,3})\b(\s|$))/g,'')
        // remove all the numbers
        text = await text.replace(/[0-9]/g, '')
        // remove stopwords
        text = await this.removeStopwords(text)
        // replace misspelled words
        text = await this.replaceMisspelledWords(text)

        return text
    }

    removeStopwords = async (text: string) => {
        const stopWords = [
            'ieee', 'transactions', 'on', 'software', 'engineering', 'university', 'of', 'victoria', 'copyright', 'global', 'copying',
            'distributing', 'print', 'electric', 'forms', 'without', 'written', 'permission', 'global', 'prohibited', 'chapter', 'abstracti',
            'abstract', 'introduction', 'conclusion'
        ]
        for(let word of stopWords) 
            text = await text.replace(word, '')
        
        let textArray = text.split(' ')
        textArray = await Stopword.removeStopwords(textArray)
        text = textArray.join(' ')
        return text
    }

    replaceMisspelledWords = async (text: string) => {
        const nodehun = new Nodehun(affix, dictionary)
        let textArray = text.split(" ")
        for(let word of textArray) {
            if(!await nodehun.spell(word)) {
                const suggest = await nodehun.suggest(word)
                if(suggest !== null)
                    text = text.replace(word, suggest.join(' '))
            }
        }
        return text
    }

}