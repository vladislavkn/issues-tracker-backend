import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IssuesModule } from './issues/issues.module';
import { DATABASE_CONFIG_KEY, databaseConfig } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { authConfig } from './config/auth.config';
import { AuthModule } from './auth/auth.module';
import { CaptchaModule } from './captcha/captcha.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, authConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        ...config.get(DATABASE_CONFIG_KEY),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    IssuesModule,
    UsersModule,
    AuthModule,
    CaptchaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
