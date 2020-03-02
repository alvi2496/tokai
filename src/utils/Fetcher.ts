import axios from 'axios'

export class Fetcher {
    
    public url: string

    constructor(url: string) {
        this.url = url
    }

    public fetchPage = async () => {
        try {
            const page = await axios.get(this.url)
            return page.data
        } catch (e) {
            console.log(e)
        }
    } 
}