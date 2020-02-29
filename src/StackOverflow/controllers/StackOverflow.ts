import { Fetcher } from "../../Fetcher"

export class StackOverflow {

    public page: any

    constructor (page: any) {
        this.page = page
    }

    public baseUrl = 'https://stackoverflow.com'
    public tags = [
        {
            name: 'design-patterns',
            url: 'https://stackoverflow.com/questions/tagged/design-patterns',
            limit: 1880
        },
        {
            name: 'software-design',
            url: 'https://stackoverflow.com/questions/tagged/software-design',
            limit: 97
        },
        {
            name: 'class-design',
            url: 'https://stackoverflow.com/questions/tagged/class-design',
            limit: 70
        },
        {
            name: 'design-principles',
            url: 'https://stackoverflow.com/questions/tagged/design-principles',
            limit: 18
        },
        {
            name: 'system-design',
            url: 'https://stackoverflow.com/questions/tagged/system-design',
            limit: 16
        },
        {
            name: 'application-design',
            url: 'https://stackoverflow.com/questions/tagged/application-design',
            limit: 15
        },
        {
            name: 'code-design',
            url: 'https://stackoverflow.com/questions/tagged/code-design',
            limit: 11
        }
    ]
}