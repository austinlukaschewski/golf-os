import { Injectable } from '@nestjs/common';

import { InjectPGEntityManager, User } from '@golf-os/models/postgresql';

import { EntityManager } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectPGEntityManager() private readonly entityManager: EntityManager) {}

    async getMeById(id: string) {
        return this.entityManager.findOneOrFail(User, {
            relations: ['golfer'],
            where: { id },
            cache: 60000,
        });
    }
}
