import express from 'express'
import ReactDOM from 'react-dom/server'
import { App } from '../App'
import { indexTemplate } from './indexTemplate'
import axios from 'axios'

const app = express()

app.use('/static', express.static('./public/client'))

app.get('/auth', (req, res) => {
  axios
    .post(
      'https://www.reddit.com/api/v1/access_token',
      `grant_type=authorization_code&code=${req.query.code}&redirect_uri=http://localhost:3000/auth`,
      {
        auth: { username: process.env.CLIENT_ID, password: 'FfxWmrQtcVvG8D4QOUQUOeF5Jk97BA' },
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      }
    )
    .then(({ data }) => {
      console.log('token', data.access_token)
      res.send(indexTemplate(ReactDOM.renderToString(App()), data.access_token))
    })
    .catch(console.log)
})

app.get('*', (req, res) => {
  res.send(indexTemplate(ReactDOM.renderToString(App())))
})

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000')
})
