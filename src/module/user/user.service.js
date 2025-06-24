const { Role } = require('@prisma/client')
const prisma = require('../../config/prisma')

exports.updateUser = async ({ image, name, isActive }, id) => {
    try {
        return await prisma.user.update({
            where: { id },
            data: { image, name, isActive }
        })
    } catch (error) {
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

exports.getAllUsers = async (search='') => {
    try {
        return await prisma.user.findMany({
            where: {
                role: Role.user,
                OR: [
                    {
                        name: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    },
                    {
                        email: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    }
                ]
            }
        })
    } catch (error) {
        throw new Error(error)
    }
}