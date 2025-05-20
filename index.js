require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./src/config/prisma')

const authRoutes = require('./src/module/auth/auth.route')
const postRoutes = require('./src/module/post/post.route')


const server = express()

server.use(cors())
server.use(express.json())

const apiRouter = express.Router()
server.use("/api", apiRouter)

apiRouter.use('/auth', authRoutes)
apiRouter.use('/posts', postRoutes)

const PORT = 3000 || process.env.PORT

server.listen(PORT, () => {
    console.log(`server running at post ${PORT}`);
})

server.get("/",(req,res)=>{
    res.send(`<h1>real_api server is live</h1>`)
})