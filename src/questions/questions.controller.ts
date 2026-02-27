import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { AnswerQuestionDto } from './dto/answer-question.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  randomQuestion() {
    return this.questionsService.getRandomQuestion();
  }

  @Get(':id')
  getQuestionById(@Param('id') id: string) {
    return this.questionsService.getQuestionById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.createQuestion(createQuestionDto);
  }

  @Post(':id/answer')
  answerQuestion(
    @Param('id') id: string,
    @Body() answerQuestionDto: AnswerQuestionDto,
  ) {
    return this.questionsService.answerQuestion(id, answerQuestionDto);
  }
}
