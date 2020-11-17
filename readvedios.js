const puppeteer = require('puppeteer')
// 配置数据
const config = {
  username: '18220190732',
  password: 'qq612401aa'
};
(async() => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  // 浏览器崩溃事件
  page.on('error', (e) => {
    console.log(e)
  })

  await page.goto('https://study.enaea.edu.cn/login.do')

  // 输入账户名和密码
  await page.type("input[name='username']", config.username, { delay: 500 })
  await page.type("input[name='password']", config.password, { delay: 500 })
  await page.click('.login-btn')
  await page.waitForNavigation()
  const pUrl = await page.url()
  if (pUrl.includes('login')) {
    // await page.waitForSelector('.form-content > .error-text > .text');
    // // 获取错误信息内容
    // const errorText = await page.$eval('.form-content > .error-text > .text', el => el.textContent.trim());
    // 报出错误信息
    throw new Error(`政采云登录失败`)
  }
  await page.screenshot({ path: 'example.png' })
  browser.close()
})()
