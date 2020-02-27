import axios from 'axios'

export class Fetcher {
    
    constructor() {}

    public fetchPage = async (url: string) => {
        try {
            const page = await axios.get(url)
            return page.data
        } catch (e) {
            console.log(e)
        }
    } 
}