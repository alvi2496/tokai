import Stopword from 'stopword'
import { Nodehun } from 'nodehun'
import fs from 'fs'

export class TextProcessor {

    nodehun: any

    constructor(){
    }

    public process = async (text: any, dictionary: any = null, literature: any = null) => {
        // lowercase and trim any leading or trailing spaces
        text = await text.toLowerCase().trim()
        //remove all the urls
        text = await text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
        // remove all the punctuations and symbols
        text = await text.replace(/(~|`|!|@|#|\$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\”|\“|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|•|φ|©|®|–|〉|=)/g, '')
        // clean anything that is not character
        text = await text.replace(/[^a-z ]+/g, '')
        // remove all the new lines and tabs
        text = await text.replace(/\n\t/ig, '').replace(/\s+|\'|\’/g, " ")
        // remove all the words with length < 3
        text = await text.replace(/(\b(\w{1,3})\b(\s|$))/g,'')
        // remove all the numbers
        text = await text.replace(/[0-9]/g, '')
        // remove stopwords
        text = await this.removeStopwords(text)
        if(dictionary) {
            // replace misspelled words
            text = await this.replaceMisspelledWords(text, dictionary, literature)
            // again remove all the words with length < 3
            text = await text.replace(/(\b(\w{1,3})\b(\s|$))/g,'')
        }
        
        return text
    }

    removeStopwords = async (text: any) => {
        const stopWords = [
            'ieee', 'transactions', 'on', 'software', 'engineering', 'university', 'of', 'victoria', 'copyright', 'global', 'copying',
            'distributing', 'print', 'electric', 'forms', 'without', 'written', 'permission', 'global', 'prohibited', 'chapter', 'abstracti',
            'abstract', 'introduction', 'conclusion'
        ]
        for(let word of stopWords) 
            text = await text.replace(word, '')
        
        let textArray = text.split(' ')
        text = null
        textArray = await Stopword.removeStopwords(textArray)
        text = textArray.join(' ')
        textArray = null
        return text
    }

    replaceMisspelledWords = async (text: string, dictionary: any, literature: any) => {
        let words: any = await this.divideWords(text, dictionary)
        if(literature) words.right = literature.split(" ")
        for(let word of words.wrong) {
            let suggestions: any = await dictionary.suggest(word)
            if(suggestions){
                for(let suggestion of suggestions) {
                    if(words.right.includes(suggestion))
                        words.right.push(suggestion)
                }
            }
            suggestions = null
        }
        return words.right.join(" ")
    }

    divideWords = async (text: string, dictionary: any) => {
        let textArray = text.split(" ")
        const right = [], wrong = []
        for(let word of textArray) {
            let trimed = word.trim()
            if(await dictionary.spell(trimed))
                if(trimed !== '') right.push(trimed)
            else
                wrong.push(trimed)
        }
        return {right, wrong}
    }
}

export class Dictionary {
    constructor() {}

    public create = async () => {
        const en_GB_affix = fs.readFileSync(`${process.cwd()}/dictionary/en_GB.aff`)
        const en_GB_dic = fs.readFileSync(`${process.cwd()}/dictionary/en_GB.dic`)
        const en_AU_dic = fs.readFileSync(`${process.cwd()}/dictionary/en_AU.dic`)
        const en_CA_dic = fs.readFileSync(`${process.cwd()}/dictionary/en_CA.dic`)
        const en_US_dic = fs.readFileSync(`${process.cwd()}/dictionary/en_US.dic`)
        const en_ZA_dic = fs.readFileSync(`${process.cwd()}/dictionary/en_ZA.dic`)
        let nodehun = new Nodehun(en_GB_affix, en_GB_dic)
        await nodehun.addDictionary(en_AU_dic)
        await nodehun.addDictionary(en_CA_dic)
        await nodehun.addDictionary(en_US_dic)
        await nodehun.addDictionary(en_ZA_dic)
        
        return nodehun
    }
}

export class Literature {
    constructor(){}

    public create = async () => {
        const literature = fs.readFile(`${process.cwd()}/data/PdfDocument/data.txt`, (err, data) => {
            if(err)
                return console.log(err)
            return data
        })
    }
}