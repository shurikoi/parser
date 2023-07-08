const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

console.log('Start')

// Fetches data from a website
axios('https://nationaltoday.com/what-is-today/')
    .then(response => {
        const $ = cheerio.load(response.data)
        let output = ''

        // Iterates one by one element with class 'holiday-title'
        $('.holiday-title').each((i, el) => {
            output += `${$(el).text()}\n`
        })
        fs.writeFile('output.txt', output, error => {
            if (error) {
                console.error(error)
                return
            }
        })
        console.log('Success!')
    })
    .catch(error => console.error(error.message))