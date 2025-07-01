const { sendError } = require('./response-handler')
const jsonwebtoken = require('jsonwebtoken')
const multer = require('multer')
const fs = require('fs');

exports.jwtMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            sendError(res, 400, "token not found")
            return;
        }
        const user = jsonwebtoken.verify(token, process.env.PRIVATE_KEY)
        req.user = user
        next()
    } catch (error) {
        sendError(res, 401, "Invalid or expired token", error)
    }
}

exports.allowRoles = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            const user = req.user;

            if (!user) {
                sendError(res, 401, 'Unauthorized');
                return;
            }

            if (!allowedRoles.includes(user.role)) {
                sendError(res, 403, 'Access denied: insufficient permissions');
                return;
            }
            next();
        } catch (error) {
            sendError(res, 500, 'Role check failed', error);
        }
    };
};


// --- Create uploads directory if it doesn't exist ---
const uploadPath = './uploads';
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, uploadPath);
    },
    filename: (req, file, callback) => {
        const filename = `image-${Date.now()}-${file.originalname}`;
        callback(null, filename);
    }
});

const fileFilter = (req, file, callback) => {
    const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(null, false);
        return callback(new Error("Please upload file with following extensions (jpg/jpeg/png)"));
    }
};

const multerConfig = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

exports.uploadSingle = (fieldName) => multerConfig.single(fieldName);
exports.uploadMultiple = (fieldName, maxCount = 5) => multerConfig.array(fieldName, maxCount);

// router.post('/upload', uploadSingle('image')
// router.post('/upload-multiple', uploadMultiple('images', 5)