const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://www.google.com')
  const a = await page.$('a')

  console.log(await a.asElement().boxModel())

  await browser.close()
})()
