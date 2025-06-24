const fs = require('fs');
const path = require('path');

const clearUnwantedFiles = (allowedFiles = [], uploadDir = './uploads') => {
    const directoryPath = path.resolve(uploadDir);

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error reading uploads folder:', err);
            return;
        }

        files.forEach((file) => {
            if (!allowedFiles.includes(file)) {
                const filePath = path.join(directoryPath, file);
                fs.unlink(filePath, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error(`Failed to delete file: ${file}`, unlinkErr);
                    } else {
                        console.log(`Deleted: ${file}`);
                    }
                });
            }
        });
    });
};

module.exports = clearUnwantedFiles

// bug fixx