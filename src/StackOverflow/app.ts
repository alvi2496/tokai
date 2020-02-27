import { Fetcher } from '../Fetcher'
import { IndexPage } from './IndexPage'

const fetcher = new Fetcher()
const indexPage = new IndexPage()

fetcher.fetchPage('https://stackoverflow.com/questions/tagged/software-design?tab=newest&page=2&pagesize=50').then((page) => {
    indexPage.questionSummary(page).then((questionSummary) => {
        console.log(questionSummary)
        console.log(questionSummary.summary.length)
    })
})