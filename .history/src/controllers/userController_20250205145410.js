const multer = require('multer');
const User = require('../models/User');
const path = require('path');

// Настроим Multer для обработки изображений
const storage = multer.memoryStorage(); // Используем память для хранения файла перед отправкой в базу данных
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  },
});

// Маршрут для обновления аватарки
const updateAvatar = upload.single('avatar'); // 'avatar' - это имя поля для загрузки файла

const updateUserAvatar = async (req, res) => {
  try {
    const userId = req.user.id; // Получаем id пользователя из JWT
    const avatar = req.file.buffer; // Получаем бинарные данные изображения из multer

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.avatar = avatar; // Сохраняем бинарные данные в поле avatar
    await user.save();

    res.status(200).json({ message: 'Avatar updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { updateAvatar, updateUserAvatar };
