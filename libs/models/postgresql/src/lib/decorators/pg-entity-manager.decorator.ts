import { InjectEntityManager } from '@nestjs/typeorm';

import { DATA_SOURCE_NAME } from '../data-source';

export const InjectPGEntityManager = () => InjectEntityManager(DATA_SOURCE_NAME);
