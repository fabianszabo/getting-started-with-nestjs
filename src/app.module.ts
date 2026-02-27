import { Module } from '@nestjs/common';
import { QuestionsModule } from './questions/questions.module';
import { JokesModule } from './jokes/jokes.module';

@Module({
  imports: [QuestionsModule, JokesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
