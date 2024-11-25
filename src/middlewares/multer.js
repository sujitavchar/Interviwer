import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = path.join('S:/web projects/Interviwer/Interviwer/public/temp');

      // Check if the directory exists; if not, create it
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true }); // Create directory if it doesn't exist
      }
  
      cb(null, dir); // Use the directory path
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

      
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  
export const upload = multer({ storage: storage })