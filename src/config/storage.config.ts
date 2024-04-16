import { diskStorage } from 'multer';

export const storage = diskStorage({
  destination: './uploads', 
  filename: (req, file, cb) => {

    // Generate a unique filename for each uploaded file
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null,  uniqueSuffix+"-"+file.originalname );
  },
});