
const { textContent } = require('domutils')
const puppeteer = require('puppeteer')

async function start() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto("https://www.instagram.com/asusrog.in/")
  // await page.screenshot({path: "abc.png", fullPage:true })

  // const selector = '#mount_0_0_YK > div > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div > div.x78zum5.xdt5ytf.x10cihs4.x1t2pt76.x1n2onr6.x1ja2u2z > section > main > div > ul > li:nth-child(1) > div > span > span';

  // const data = await page.evaluate(selector =>{
  //   const anchor = Array.from(document.querySelectorAll(selector));
  //   console.log(anchor)
  //   return anchor.map(anchor => {
  //     const title = anchor.textContent();
  //     return `${title}`.toString()
  //   })
  // })
  
  let data1 = await page.evaluate(() => {
    let a = Array.from(document.querySelectorAll("#mount_0_0_4w > div > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div > div.x78zum5.xdt5ytf.x10cihs4.x1t2pt76.x1n2onr6.x1ja2u2z > div.x9f619.xnz67gz.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1qughib > div.xh8yej3.x1gryazu.x10o80wk.x14k21rp.x1porb0y.x17snn68.x6osk4m > section > main > div > ul > li:nth-child(1) > div > span > span")).map(x => x.textContent)
    let b = a.toString();
    console.log(b)
    return b

    })
  // console.log(data1)
  
  await browser.close()
}

start()