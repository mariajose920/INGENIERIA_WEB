import 'dotenv/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emprendedor } from './emprendedores/entities/emprendedor.entity';
import { EmprendedoresModule } from './emprendedores/emprendedores.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'data.db',
      entities: [Emprendedor],
      synchronize: true // SOLO en desarrollo (no en producción)
    }),
    EmprendedoresModule
  ],
})
export class AppModule {}
