const puppeteer = require('puppeteer')

async function start(name) { 
  const browser = await puppeteer.launch({
    headless: false,
    // slowMo: 100,
    devtools: false,
  });
  const page = await browser.newPage()

  
  await page.goto(`https://www.facebook.com/AsusIndia`)

//   //rutu
//   let profileImage = await page.evaluate(() => {
//     let a = Array.from(document.querySelectorAll("")).map(e => e.src).toString();
//     return a
//   })
//   console.log("profileImage .............",profileImage)

//   let verifiedAcc = await page.evaluate(() => {
//     let a = Array.from(document.getElementsByClassName("_act0 _a9_u _9ys7")).map(e=>e.textContent).toString();
//     return a
//   })
//   console.log("verifiedAcc .............",verifiedAcc)

//   let postCount = await page.evaluate(() => {
//     let a = Array.from(document.querySelectorAll("._ac2a")).map(e=>e.textContent)[0].toString();
//     return a
//   })
//   console.log("postCount .............",postCount)

//   let followingNumber = await page.evaluate(() => {
//     let a = Array.from(document.querySelectorAll("._ac2a")).map(e=>e.textContent)[1].toString();
//     return a
//   })
//   console.log("followingNumber .............",followingNumber)

  let followerNumber = await page.evaluate(() => {
    let a = Array.from(document.querySelectorAll("#mount_0_0_\\/3 > div > div:nth-child(1) > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div > div.x78zum5.xdt5ytf.x10cihs4.x1t2pt76.x1n2onr6.x1ja2u2z > div.x78zum5.xdt5ytf.x1t2pt76.x1n2onr6 > div.x6s0dn4.x78zum5.xdt5ytf.x193iq5w > div.x9f619.x193iq5w.x1talbiv.x1sltb1f.x3fxtfs.x1swvt13.x1pi30zi.x1y1aw1k > div > div.x9f619.x1n2onr6.x1ja2u2z.xeuugli.xs83m0k.x1xmf6yo.x1emribx.x1e56ztr.x1i64zmx.xjl7jj.xnp8db0.x1d1medc.x7ep2pv.x1xzczws > div.x7wzq59 > div:nth-child(1) > div > div > div > div.x1jx94hy.x78zum5.xdt5ytf > div:nth-child(4) > div.xjyslct.xjbqb8w.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1rg5ohu.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.xh8yej3 > div > div > div.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x193iq5w.xeuugli.x1r8uery.x1iyjqo2.xs83m0k.xamitd3.xsyo7zv.x16hj40l.x10b6aqq.x1yrsyyn > div > div > span > span:nth-child(1)")).map(e=>e.textContent)[2].toString();
    return a   
  })
  console.log("followerNumber .............",followerNumber)


  await browser.close()
}

start()
