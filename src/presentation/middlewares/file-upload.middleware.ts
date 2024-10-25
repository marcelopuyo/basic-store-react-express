import { NextFunction, Request, Response } from "express";



export class FileUploadMiddleware {

  static containFiles(req: Request, res: Response, next: NextFunction) {

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No se enviaron archivos'});
    }

    if (!Array.isArray(req.files.file)) {
      req.body.files = [req.files.file];
    } else {
      req.body.files = req.files.file;
    }

    next();

  }

  static validateTypes(validExtensions: string[] = []) {

    validExtensions = validExtensions.concat('png', 'jpg', 'jpeg', 'gif');

    return (req: Request, res: Response, next: NextFunction) => {
      let isValid = true;
      let invalidFileExtension: string = '';

      req.body.files.forEach((file: any) => {
        const indxUltimoPunto = file.name.split('.').length;
        const fileExtension = file.name.split('.').at(indxUltimoPunto - 1) ?? '';

        if (!validExtensions.includes(fileExtension)) {
          isValid = false;
          invalidFileExtension = fileExtension;
        }
      });

      if (isValid) {
        next();
      } else {
        return res.status(400).json(`Extension invalida: ${ invalidFileExtension }`);
      }
    }
  }

}

