import { Parser } from 'json2csv'
import fs from 'fs'

export class Saver {

    data: any

    constructor(data: any) {
        this.data = data
        if (!fs.existsSync(`${process.cwd()}/data`)) 
            fs.mkdirSync(`${process.cwd()}/data`)
        if (!fs.existsSync(`${process.cwd()}/log`)) 
            fs.mkdirSync(`${process.cwd()}/log`)
    }

    public toCsv = async (dir: string) => {
        const parser = new Parser()
        const csv = await parser.parse(this.data)
        if (!fs.existsSync(dir)) 
            fs.mkdirSync(dir)
        fs.writeFile(`${dir}/data.csv`, csv, async (err) => {
            if(err) {
                return console.log(err)
            }
            console.log('File was saved!')
        })
    }

    public toTxt = async (dir: string) => {
        if (!fs.existsSync(dir))
            fs.mkdirSync(dir)
        fs.writeFile(`${dir}/data.txt`, this.data, async (err) => {
            if(err) {
                return console.log(err)
            }
            console.log('File was saved!')
        })
    }

    toLog = async (dir: string) => {
       fs.appendFile(`${process.cwd()}/log/${dir}.log`, this.data, async (err) => {
            if(err) {
                return console.log(err)
            }
        })
    }
} 