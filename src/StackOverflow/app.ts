import { Fetcher } from '../Fetcher'
import { IndexPage } from './IndexPage'
import { DetailPage } from './DetailPage'

const fetcher = new Fetcher()
const indexPage = new IndexPage()
const detailPage = new DetailPage()

// fetcher.fetchPage('https://stackoverflow.com/questions/59553169/wich-package-strategy-use-to-achieve-high-cohesion-and-low-coupling').then((page) => {
//     indexPage.questionSummary(page).then((questionSummary) => {
//         console.log(questionSummary)
//         console.log(questionSummary.summary.length)
//     })
// })

fetcher.fetchPage('https://stackoverflow.com/questions/59553169/wich-package-strategy-use-to-achieve-high-cohesion-and-low-coupling').then((page) => {
    detailPage.questionDetail(page).then((questionDetail) => {
        console.log(questionDetail)
    })
})