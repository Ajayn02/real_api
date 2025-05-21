const prisma = require('../../config/prisma')

exports.updateUser = async ({ image, name }, id) => {
    try {

        return await prisma.user.update({
            where: { id },
            data: { image, name }
        })
    } catch (error) {
        console.log(error);

        throw new Error('Failed to update user')
    }
}

exports.getUserById = async (id, tx) => {
    try {
        if (tx) {
            return await tx.user.findUnique({
                where: { id },
            })
        }
        return await prisma.user.findUnique({
            where: { id },
        })
    } catch (error) {
        throw new Error(error)
    }
}

exports.deleteUser = async (id) => {
    try {
        return await prisma.user.delete({
            where: { id }
        })
    } catch (error) {
        throw new Error(error)
    }
}

exports.getAllUsers = async () => {
    try {
        return await prisma.user.findMany()
    } catch (error) {
        throw new Error(error)
    }
}