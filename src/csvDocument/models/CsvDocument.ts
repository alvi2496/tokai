import { Reader } from '../../utils/Reader'

export class CsvDocument {
    
    public read = async () => {
        let url: string = `${process.cwd()}/src/csvDocument/data/Brunet2014.csv`
        const file: any = await new Reader(url).readCsv(true)
        return file
    }
}