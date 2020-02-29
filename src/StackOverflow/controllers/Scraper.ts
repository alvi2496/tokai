import { StackOverflow } from "./StackOverflow";
import { IndexPage } from "./IndexPage"
import { DetailPage } from "./DetailPage"
import { Fetcher } from "../../Fetcher"

export class Scraper extends StackOverflow {

    public scrape = async () => {
        this.tags.forEach( async (tag) => {
            const page = await new Fetcher(tag.url).fetchPage()
            const questionSummary = await new IndexPage(page).questionSummary
        })
    }
} 