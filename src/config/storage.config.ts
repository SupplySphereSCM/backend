import { diskStorage } from 'multer';
import { extname } from 'path';

export const storage = {
  // Set storage engine to disk storage
  storage: diskStorage({
    destination: './uploads', // Destination folder where files will be stored
    filename: (req, file, cb) => {
      // Generate a unique filename for each uploaded file
      const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
      const extension = extname(file.originalname); // Get file extension
      cb(null, `${randomName}${extension}`); // Return generated filename
    },
  }),
};
