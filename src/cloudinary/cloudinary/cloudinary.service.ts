import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
// import convert from 'buffer-to-stream';
import {Readable} from 'stream';
@Injectable()
export class CloudinaryService {

    async uploadImage(file:Express.Multer.File):Promise<UploadApiResponse | UploadApiErrorResponse>{
        return new Promise((resolve,reject)=>{
            const upload = v2.uploader.upload_stream((error,result)=>{
                if(error) return reject(error);
                resolve(result);
            });

            this.convert(file.buffer).pipe(upload);
        })
    }

    convert (buf, chunkSize?:any) {
        if (typeof buf === 'string') {
          buf = Buffer.from(buf, 'utf8')
        }
        if (!Buffer.isBuffer(buf)) {
          throw new TypeError(`"buf" argument must be a string or an instance of Buffer`)
        }
      
        const reader:any = new Readable()
        const hwm = reader._readableState.highWaterMark
      
        // If chunkSize is invalid, set to highWaterMark.
        if (!chunkSize || typeof chunkSize !== 'number' || chunkSize < 1 || chunkSize > hwm) {
          chunkSize = hwm
        }
      
        const len = buf.length
        let start = 0
      
        // Overwrite _read method to push data from buffer.
        reader._read = function () {
          while (reader.push(
            buf.slice(start, (start += chunkSize))
          )) {
            // If all data pushed, just break the loop.
            if (start >= len) {
              reader.push(null)
              break
            }
          }
        }
        return reader
      }
      
}
