import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

// import * as csv from 'csv-parse';
import { parse } from 'csv-parse';
import { chain, isNumber, toNumber } from 'lodash';

@Controller('/files')
export class FileController {
    @Post('/upload')
    @UseInterceptors(
        FileInterceptor('file', {
            limits: { files: 1 },
            fileFilter: (req, file, cb) => {
                if (file.mimetype !== 'text/csv') cb(new BadRequestException('Invalid file type'), false);
                else cb(null, true);
            },
        }),
    )
    async uploadFile(@UploadedFile() file: any) {
        const data = await new Promise((resolve, reject) => {
            parse(
                file.buffer,
                {
                    // headers: true,
                    columns: true,
                    relax_quotes: true,
                    skip_empty_lines: true,
                    cast: true, // DB will handle int to decimal (i.e. 179 => 179.0)
                },
                (err, records) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(records);
                    }
                },
            );
        });

        return data;
    }
}
