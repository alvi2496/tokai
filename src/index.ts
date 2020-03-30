import { argv } from 'yargs'

let appName: string = 'StackOverflow'

if(argv.app === 'so') appName = 'StackOverflow'
else if(argv.app == 'pdf') appName = 'PdfDocument'
else if(argv.app == 'csv') appName = 'csvDocument'
 
require(`./${appName}/app`)