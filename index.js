const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app= express()
var repeatCounter=0
const {stockName}= require('./../../personalcoding/stock-list.js')
const {arrExclude}= require('./../../personalcoding/stock-exclude.js')
const url = 'https://www.globenewswire.com/NewsRoom'

function funcFullScrape() {
    axios(url)
    .then(response=> {
        const html = response.data
        const $= cheerio.load(html)
        const arrAllTitles=[]
        let arrFilteredTitles= []
        let arrMatch=[]
        let stringMatch
        $('.pagging-list-item-text-container', html).each(function(){
            const scrapeTitle = $(this).find('a').attr('href').replace(/-/g, ' ').replace(/news release/g,'').replaceAll('//','')
            arrAllTitles.push({
                scrapeTitle
            })
        })
        if(arrAllTitles[0]==undefined) {
            return console.log('ERROR: TAG NOT FOUND----ERROR: TAG NOT FOUND----ERROR: TAG NOT FOUND')
        }
        for(let i=0;i<arrAllTitles.length;i++) {
            let stringTitle= arrAllTitles[i].scrapeTitle.toLowerCase()
            let myRegex= new RegExp(stockName.join('|'), "gi")
            for(let k=0;k<arrExclude.length;k++){
                if(stringTitle.includes(arrExclude[k].toLowerCase())) {
                    stringTitle= '@@@!!@@@'
                }
            }
            stringMatch = stringTitle.match(myRegex)
            if(stringMatch) {
                arrFilteredTitles.push(stringTitle)
                arrMatch.push(stringMatch[0])
            }
        }
        if(arrFilteredTitles[0]) {
            const funcSuccess= () => console.log(arrFilteredTitles, arrMatch,  "\n", '\x07', "\n", 
            `Run count: ${repeatCounter+=1}.....GLOBAL-NEWSWIRE-MATCH FOUND!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`)
            funcSuccess()
            setTimeout(funcSuccess, 6000)
            setTimeout(funcSuccess, 12000)
            return setTimeout(funcFullScrape, 10000)
        } else {
            console.log(`Scraper bot running..........${repeatCounter+=1}`)
            setTimeout(funcFullScrape, 5000)
        }
    }).catch(err => console.log(err))
}
funcFullScrape()
app.listen(PORT, ()=> console.log(`server running on PORT ${PORT}`))







// const PORT = 8000
//     const axios = require('axios')
//     const cheerio = require('cheerio')
//     const express = require('express')
//     const app= express()
//     var count1=0
//     const url = 'https://www.globenewswire.com/NewsRoom'
//     const {keyword}= require('./../../personalcoding/stock-list.js')
// function gobo() {
// axios(url)
//     .then(response=> {
//         const html = response.data
//         const $= cheerio.load(html)
//         const articles=[]
//         $('.pagging-list-item-text-container', html).each(function(){
//             const title = $(this).find('a').attr('href').replace(/-/g, ' ').replace(/news release/g,'').replaceAll('//','')
//             //const zurl= $(this).find('a').attr('href')
//             //const title = $(this).text().replace(/n/, '')
//             articles.push({
//                 title
//             })
//         })
//         let result
//         let arr1= []
//         for(let i=0;i<articles.length;i++) {
//             var titlez= articles[i].title
//             var myRegex= new RegExp(keyword.join('|'), "gi")
//             if(titlez.includes(' depokj ')) {
//                 titlez= '@@@@@@'
//             } else if(titlez.includes('Conference')) {
//                 titlez= '@@@@@@'
//             } else if(titlez.includes('Financial Results')) {
//                 titlez= '@@@@@@'
//             } else if(titlez.includes('First Quarter')) {
//                 titlez= '@@@@@@'
//             } else if(titlez.includes('Second Quarter')) {
//                 titlez= '@@@@@@'
//             } else if(titlez.includes('Third Quarter')) {
//                 titlez= '@@@@@@'
//             } else if(titlez.includes('Fourth Quarter')) {
//                 titlez= '@@@@@@'
//             } 
//             result = titlez.match(myRegex)
//             if(result) {
//                 arr1.push(titlez)
//             }
//         }
//         if(arr1[0]) {
//         var show1= () => console.log(arr1,'\x07', "\n", `Run count: ${count1+=1}.....GLOBAL-NEWSWIRE-MATCH FOUND!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`)
//         show1()
//         setTimeout(show1, 6000)
//         setTimeout(show1, 12000)
//         setTimeout(gobo, 40000)
//         } else {
//             console.log(`Scraper bot running..........${count1+=1}`)
//             setTimeout(gobo, 40000)
//         }
//     }).catch(err => console.log(err))
// }
// gobo()
// app.listen(PORT, ()=> console.log(`server running on PORT ${PORT}`))