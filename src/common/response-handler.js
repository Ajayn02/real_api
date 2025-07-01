const { Prisma } = require('@prisma/client');

exports.sendResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        data,
        success: true,
        message,
    });
};

exports.sendError = (res, statusCode, message, error = null
) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(statusCode).json({
            error: error,
            success: false,
            message,
        });
    } else {
        return res.status(statusCode).json({
            error: error,
            success: false,
            message,
        });
    }
}