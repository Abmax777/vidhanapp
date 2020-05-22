const fs = require('fs')
const path = require('path')
const axios = require('axios')

const suitsDir = '/Users/nascarsayan/Code/web/vidhan/data/Cases_JSON'
const statutesDir = '/Users/nascarsayan/Code/web/vidhan/data/Statutes_JSON'

const insert = async (dataDir, slug) => {
  let ok = 0
  let tot = 0
  await fs.readdir(dataDir, async (err, fnames) => {
    tot = fnames.length
    await Promise.all(
      fnames.map(async fname => {
        const data = JSON.parse(fs.readFileSync(path.join(dataDir, fname)))
        const url = `http://localhost:4040/api/${slug}`
        try {
          const res = await axios.post(url, data, { proxy: false })
          if (res.status === 200) ok += 1
        } catch (error) {
          console.log(JSON.stringify(error, null, 2), error.message)
        }
      })
    )
    console.log(`ok = ${ok} tot = ${tot}`)
  })
}
const insertAll = async () => {
  await insert(suitsDir, 'suits')
  await insert(statutesDir, 'statutes')
}

insertAll()
