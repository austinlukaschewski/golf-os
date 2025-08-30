import { Module } from '@nestjs/common';

import { Golfer, PostgreSQLTypeOrmModule } from '@golf-os/models/postgresql';

@Module({
    imports: [PostgreSQLTypeOrmModule.forFeature([Golfer])],
})
export class GolferModule {}
