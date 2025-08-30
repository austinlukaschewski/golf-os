import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory as JwtModuleOptionsFactory } from '@nestjs/jwt';

import { isEmpty, omit } from 'lodash';

@Injectable()
export class JwtOptionsFactory implements JwtModuleOptionsFactory {
    constructor(@Inject(ConfigService) private readonly config: ConfigService) {}

    createJwtOptions(): JwtModuleOptions {
        const options = this.config.get<Partial<JwtModuleOptions> & { refresh: Partial<JwtModuleOptions> }>('jwt');
        if (isEmpty(options)) throw new Error('Failed to load jwt options');

        return omit(options, 'refresh');
    }
}
