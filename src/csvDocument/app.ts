import { CsvDocument } from './models/CsvDocument'

new CsvDocument().read().then((file) => {
    console.log(file)
})