import jsonexport from 'jsonexport'
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

    public toCsv = async (dir: string, header=true, fileName: any = null) => {
        jsonexport(this.data, {includeHeaders: header}, (err: any, csv: any) => {
            if (!fs.existsSync(dir)) 
            fs.mkdirSync(dir)
            if(fileName){
                fs.appendFile(`${dir}/${fileName}.csv`, csv + '\n', async (err) => {
                    if(err) {
                        return console.log(err)
                    }
                    console.log(`${fileName} saved`)
                }) 
            }
            else {
                fs.appendFile(`${dir}/data.csv`, csv + '\n', async (err) => {
                    if(err) {
                        return console.log(err)
                    }
                    console.log('Chunk saved!')
                })
            }
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

    public toLog = async (dir: string) => {
       fs.appendFile(`${process.cwd()}/log/${dir}.log`, this.data, async (err) => {
            if(err) {
                return console.log(err)
            }
        })
    }
} 