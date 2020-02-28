import { Fetcher } from '../Fetcher'
import { IndexPage } from './controllers/IndexPage'
import { DetailPage } from './controllers/DetailPage'

const fetcher = new Fetcher()
const indexPage = new IndexPage()
const detailPage = new DetailPage()

// fetcher.fetchPage('https://stackoverflow.com/questions/59553169/wich-package-strategy-use-to-achieve-high-cohesion-and-low-coupling').then((page) => {
//     indexPage.questionSummary(page).then((questionSummary) => {
//         console.log(questionSummary)
//         console.log(questionSummary.summary.length)
//     })
// })

fetcher.fetchPage('https://stackoverflow.com/questions/2882490/how-to-get-the-current-url-within-a-django-template').then((page) => {
    detailPage.questionDetail(page).then((questionDetail) => {
        console.log(JSON.stringify(questionDetail, null, 4))
    })
})