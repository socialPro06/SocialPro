const puppeteer = require('puppeteer')

async function start(name) {
  const browser = await puppeteer.launch({
    headless: false,
    // slowMo: 100,
    devtools: false,
  });
  const page = await browser.newPage()

  await page.goto(`https://www.instagram.com/${name}`)
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

  // let data1 = await page.evaluate(() => {
  //   let a = Array.from(document.querySelectorAll("#mount_0_0_4w > div > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div > div.x78zum5.xdt5ytf.x10cihs4.x1t2pt76.x1n2onr6.x1ja2u2z > div.x9f619.xnz67gz.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1qughib > div.xh8yej3.x1gryazu.x10o80wk.x14k21rp.x1porb0y.x17snn68.x6osk4m > section > main > div > ul > li:nth-child(1) > div > span > span")).map(x => x.textContent)
  //   let b = a.toString();
  //   console.log(b)
  //   return b
  // })
  // console.log(data1)

  //rutu
  let profileImage = await page.evaluate(() => {
    let a = Array.from(document.querySelectorAll("._aarg img")).map(e => e.src).toString();
    return a
  })
  console.log("profileImage .............",profileImage)

  let verifiedAcc = await page.evaluate(() => {
    let a = Array.from(document.getElementsByClassName("_act0 _a9_u _9ys7")).map(e=>e.textContent).toString();
    return a
  })
  console.log("verifiedAcc .............",verifiedAcc)

  let postCount = await page.evaluate(() => {
    let a = Array.from(document.querySelectorAll("._ac2a")).map(e=>e.textContent)[0].toString();
    return a
  })
  console.log("postCount .............",postCount)

  let followingNumber = await page.evaluate(() => {
    let a = Array.from(document.querySelectorAll("._ac2a")).map(e=>e.textContent)[1].toString();
    return a
  })
  console.log("followingNumber .............",followingNumber)

  let followerNumber = await page.evaluate(() => {
    let a = Array.from(document.querySelectorAll("._ac2a")).map(e=>e.textContent)[2].toString();
    return a
  })
  console.log("followerNumber .............",followerNumber)

  let bio = await page.evaluate(() => {
    let a = Array.from(document.querySelectorAll("._aa_c ._aade")).map(e=>e.textContent).toString();
    let b=a.split(",");
    return b
  })
  console.log("bio .............",bio)

  await browser.close()
}

start("asusrog.in")