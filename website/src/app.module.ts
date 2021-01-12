import Module from '@nestjs/common';
import AppController from './app.controller';
import AppService from './app.service';

@Module({
  import *s: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
