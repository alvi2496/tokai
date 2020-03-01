import { Parser } from 'json2csv'
import fs from 'fs'

export class Saver {

    data: any

    constructor(data: any) {
        this.data = data
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
            console.log('File was saved')
        })
    }
} 