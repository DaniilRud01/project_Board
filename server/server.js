import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import jwt from 'jsonwebtoken'
import React from 'react'

import cookieParser from 'cookie-parser'
import mongooseServices from './services/mongoose'
import User from './model/user.model'
import SetProject from './model/project.model'
import config from './config'
import Html from '../client/html'

const Root = () => ''

mongooseServices.connect()

try {
  // eslint-disable-next-line import/no-unresolved
  // ;(async () => {
  //   const items = await import('../dist/assets/js/root.bundle')
  //   console.log(JSON.stringify(items))

  //   Root = (props) => <items.Root {...props} />
  //   console.log(JSON.stringify(items.Root))
  // })()
  console.log(Root)
} catch (ex) {
  console.log(' run yarn build:prod to enable ssr')
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

server.get('/api/v1/auth', async (req, res) => {
  try {
    const jwtUser = jwt.verify(req.cookies.token, 'secretKey')
    const user = await User.findById(jwtUser.uid)
    res.json({ token: req.cookies.token, user })
  } catch (e) {
    console.log(e)
  }
})
// eslint-disable-next-line consistent-return
server.post('/api/v1/auth', async (req, res) => {
  try {
    const user = await User.findAndValidateUser(req.body)
    delete user.password
    const token = jwt.sign({ uid: user.id }, 'secretKey', { expiresIn: '48h' })
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    return res.json({ token, user })
  } catch (e) {
    console.log(e)
  }
  res.json({ status: 'ok' })
})

server.get('/api/v1/logout', (req, res) => {
  res.clearCookie('token')
  res.json('user logout')
})

server.post('/api/v1/register', async (req, res) => {
  const { email, password } = req.body
  const newUser = await new User({
    email,
    password
  })
  newUser.save()
  res.json({ status: 'user is register' })
})

server.post('/api/v1/project', async (req, res) => {
  const { image, name, startDate, endDate, supervisor, admin } = req.body
  const newProject = await new SetProject({
    image,
    name,
    startDate,
    endDate,
    supervisor,
    admin
  })
  newProject.save()
  console.log(newProject)
  res.json({ status: 'project is create' })
})

server.get('/api/v1/project', async (req,res) => {
  const project = await SetProject.find({})
  res.json(project)
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Boilerplate'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
