require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./src/config/prisma')

const authRoutes = require('./src/module/auth/auth.route')
const postRoutes = require('./src/module/post/post.route')
const userRoutes = require('./src/module/user/user.route')
const saveRoutes = require('./src/module/save/save.route')
const reportRoutes = require('./src/module/report/report.route')
const adminRoutes = require('./src/module/admin/admin.route')

const postService = require('./src/module/post/post.service')
const userService = require('./src/module/user/user.service')
const clearUnwantedFiles = require('./src/common/cleanup-uploads')

const server = express()

server.use(cors())
server.use(express.json())
server.use('/uploads', express.static('./uploads'))

const apiRouter = express.Router()
server.use("/api", apiRouter)

apiRouter.use('/auth', authRoutes)
apiRouter.use('/posts', postRoutes)
apiRouter.use('/users', userRoutes)
apiRouter.use('/save', saveRoutes)
apiRouter.use('/reports', reportRoutes)
apiRouter.use('/admin', adminRoutes)

const PORT = 3000 || process.env.PORT

server.listen(PORT, async () => {
    const allPosts = await postService.getAllImages()
    const allUsers = await userService.getAllUsers()
    const allPostImages = allPosts.map((item) => item.image);
    const allUserImages = allUsers.map((item) => item.image)
    const allowedFiles = [...allPostImages, ...allUserImages];
    clearUnwantedFiles(allowedFiles);
    console.log(`server running at post ${PORT}`);
})

server.get("/", (req, res) => {
    res.send(`<h1>real_api server is live</h1>`)
})