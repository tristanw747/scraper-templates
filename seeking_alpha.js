const PORT = 8042
const express = require('express')
const app= express()
var repeatCounter=0
const playSound= ()=>'\x07'
const rando= Math.random()
const resetTimer= Math.round((rando*1000)+4000)
const resetTimer2= Math.round((rando*400)+4200)
const {stockName}= require('./../../personalcoding/stock-list.js')
const {arrExclude}= require('./../../personalcoding/stock-exclude.js')
const url = 'https://seekingalpha.com/market-news'
const puppeteer = require('puppeteer-extra')
const funcFail= () => console.log( 'ERROR: TAG NOT FOUND----ERROR: TAG NOT FOUND----ERROR: TAG NOT FOUND','\x07')
//const fs = require('fs/promises')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

async function funcFullScrape() {
    var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = "Time Stamp: "+date+' '+time;

    let arrFilteredTitles= []
    let arrMatch=[]
    const browser= await puppeteer.launch({userDataDir: './ZZdata', headless: true }).then(async browser => {
    const page = await browser.newPage()
    // await page.goto(url)
    // await page.waitForTimeout(resetTimer2)
    // await page.goto(url, {waitUntil: 'networkidle2'})
    await page.goto(url, {waitUntil: "load", timeout: 0 })
    let arrAllTitles=''
    arrAllTitles = await page.evaluate(()=> {
        return Array.from(document.querySelectorAll('.upG')).map(x=>x.textContent)
    })//.catch(err => console.log(err))
    if(arrAllTitles[0]==undefined) {
        funcFail, setTimeout(funcFail, 500), setTimeout(funcFail, 1000), setTimeout(funcFail, 1500)
    }
    for(let i=0;i<arrAllTitles.length;i++) {
        let stringTitle= arrAllTitles[i].toLowerCase()
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
        const funcSuccess= () => console.log(`-----------${dateTime}---------------`, "\n", arrFilteredTitles, "\n", arrMatch,  '\x07',"\n",  
        `Run count: ${repeatCounter+=1}.....Seeking Alpha---Seeking Alpha---Seeking Alpha`)
        funcSuccess()
        // setTimeout(playSound, 3000)
        setTimeout(funcFullScrape, resetTimer)
    } else {
        console.log(`Scraper bot running..........${repeatCounter+=1}`)
        setTimeout(funcFullScrape, resetTimer)
    }
    await browser.close()
    })
}
funcFullScrape()
app.listen(PORT, ()=> console.log(`server running on PORT ${PORT}`))

//////////////////////////

// const PORT = 8042
// const express = require('express')
// const app= express()
// var repeatCounter=0

// const rando= Math.random()
// const resetTimer= Math.round((rando*5000)+5000)
// const resetTimer2= Math.round((rando*400)+4200)
// const {stockName}= require('./../../personalcoding/stock-list.js')
// const {arrExclude}= require('./../../personalcoding/stock-exclude.js')
// const url = 'https://seekingalpha.com/market-news'
// const puppeteer = require('puppeteer-extra')
// const funcFail= () => console.log( 'ERROR: TAG NOT FOUND----ERROR: TAG NOT FOUND----ERROR: TAG NOT FOUND','\x07')
// //const fs = require('fs/promises')
// const StealthPlugin = require('puppeteer-extra-plugin-stealth')
// puppeteer.use(StealthPlugin())


// async function funcFullScrape() {
//     let arrFilteredTitles= []
//     let arrMatch=[]
//     const browser= await puppeteer.launch({ headless: true }).then(async browser => {
//     const page = await browser.newPage()
//     await page.goto(url)
//     await page.waitForTimeout(resetTimer2)
//     let arrAllTitles=''
//     arrAllTitles = await page.evaluate(()=> {
//         return Array.from(document.querySelectorAll('.ujG')).map(x=>x.textContent)
//     })//.catch(err => console.log(err))
//     if(arrAllTitles[0]==undefined) {
//         funcFail, setTimeout(funcFail, 500), setTimeout(funcFail, 1000), setTimeout(funcFail, 1500), setTimeout(funcFail, 2000)
//     }
//     for(let i=0;i<arrAllTitles.length;i++) {
//     let stringTitle= arrAllTitles[i].toLowerCase()
//     let myRegex= new RegExp(stockName.join('|'), "gi")
//     for(let k=0;k<arrExclude.length;k++){
//         if(stringTitle.includes(arrExclude[k].toLowerCase())) {
//             stringTitle= '@@@!!@@@'
//         }
//     }
//     stringMatch = stringTitle.match(myRegex)
//     if(stringMatch) {
//         arrFilteredTitles.push(stringTitle)
//         arrMatch.push(stringMatch[0])
//         }
//     }
//     if(arrFilteredTitles[0]) {
//         const funcSuccess= () => console.log(arrFilteredTitles, "\n", arrMatch,  "\n", '\x07', "\n", 
//         `Run count: ${repeatCounter+=1}.....Seeking Alpha---Seeking Alpha---Seeking Alpha`)
//         funcSuccess()
//         setTimeout(funcSuccess, 6000)
//         setTimeout(funcSuccess, 8000)
//         setTimeout(funcFullScrape, 10000)
//     } else {
//         console.log(`Scraper bot running..........${repeatCounter+=1}`)
//         setTimeout(funcFullScrape, resetTimer)
//     }
//     await browser.close()
//     })
// }
// funcFullScrape()
// app.listen(PORT, ()=> console.log(`server running on PORT ${PORT}`))