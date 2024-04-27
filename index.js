const express = require('express')
const cors = require('cors');
const app = express()


//middleware
app.use(cors())
app.use(express.json())




const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Thousands of caravan tales created with beautiful travels!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})