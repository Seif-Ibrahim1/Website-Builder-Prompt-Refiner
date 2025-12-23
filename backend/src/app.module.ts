import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IdeaModule } from './idea/idea.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Loads .env
    IdeaModule,
  ],
})
export class AppModule {}