// docker run -d -p 6370:6379 --name redisajs redis

import express from 'express'
import session from 'express-session'
import router from './routes'
import errorHandler from './middleware/error-handler'
import path from 'path'
import bodyParser from 'body-parser'
import overrideMethod from './middleware/override-method'
import auth from './middleware/auth'
import { sequelize } from './config/database'
import connectRedis from 'connect-redis'
import Redis from 'ioredis'

export async function bootstrap () {
  const app = express()

  app.set('views', path.resolve(__dirname, 'views'))
  app.set('view engine', 'ejs')

  app.use(express.static('public'))
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(overrideMethod)

  const redisClient = new Redis(6370)

  const RedisStore = connectRedis(session)
  const store = new RedisStore({ client: redisClient })
  app.use(
    session({
      store,
      secret: 'MY SECRET',
      resave: false
    })
  )

  app.use(auth)

  const port = 8000

  app.use(router)

  app.use(errorHandler)

  await sequelize.authenticate()

  await sequelize.sync({ alter: true })

  app.listen(8000, () => {
    console.log(`Server is running on port ${port}`)
  })
}
