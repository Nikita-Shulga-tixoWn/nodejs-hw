import multer from 'multer';
import createHttpError from 'http-errors';

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter: (req, file, cb) => {
        if (!file.mimetype?.startsWith('image/')) {
            return cb(createHttpError(400, 'Only images allowed'));
        }
        cb(null, true);
    },
});

// middleware, який повертає помилки multer як HttpError (щоб не було 500)
export const uploadAvatar = (req, res, next) => {
    upload.single('avatar')(req, res, (err) => {
        if (!err) return next();

        if (err.code === 'LIMIT_FILE_SIZE') {
            return next(createHttpError(400, 'File too large'));
        }

        // якщо вже HttpError з fileFilter — передаємо як є
        return next(err);
    });
};
