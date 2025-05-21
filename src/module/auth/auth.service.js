const prisma = require('../../config/prisma')

exports.addUser = async ({ name, email, password, role }) => {
    try {
        return await prisma.user.create({
            data: { name, password, role, email }
        })
    } catch (error) {
        throw new Error('Failed to add user')
    }
}

exports.getUserByEmail = async (email) => {
    try {
        return await prisma.user.findUnique({
            where: { email }
        })
    } catch (error) {
        throw new Error('Failed to fetch user')
    }
}

