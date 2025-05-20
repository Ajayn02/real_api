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