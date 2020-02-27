import { Fetcher } from '../Fetcher'

const fetcher = new Fetcher()

fetcher.fetchPage('https://stackoverflow.com').then((page) => {
    console.log(page)
})