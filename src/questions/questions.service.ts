import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { AnswerQuestionDto } from './dto/answer-question.dto';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  private questions: Question[] = [
    {
      id: '1',
      question:
        'What keyword is used to create a variable with block scope in JavaScript?',
      answer: 'let',
    },
    {
      id: '2',
      question:
        'Which method removes the last element from an array in JavaScript?',
      answer: 'pop',
    },
    {
      id: '3',
      question:
        'In TypeScript, what is the name of the decorator used to mark a provider in NestJS?',
      answer: '@Injectable',
    },
    {
      id: '4',
      question:
        'What is the return type of a function that does not return anything in TypeScript?',
      answer: 'void',
    },
    {
      id: '5',
      question:
        'Which async/await keyword is used to pause execution until a Promise resolves?',
      answer: 'await',
    },
  ];

  checkForDuplicatesByProperty(property: keyof Question, value: string) {
    if (this.questions.find((q) => q[property] === value)) {
      throw new ConflictException(
        `A question with this ${property} already exists`,
      );
    }
  }

  checkQuestionsAvailable() {
    if (this.questions.length === 0) {
      throw new NotFoundException('No questions available');
    }
  }

  answerQuestion(id: string, answerQuestionDto: AnswerQuestionDto) {
    this.checkQuestionsAvailable();

    const question = this.questions.find((q) => q.id === id);
    if (!question) {
      throw new NotFoundException('Question not found');
    }

    if (question.answer === answerQuestionDto.answer) {
      return { message: 'Correct answer!' };
    }

    return { message: 'Wrong answer, try again!' };
  }

  createQuestion(createQuestionDto: CreateQuestionDto) {
    const newQuestion: Question = {
      id: (this.questions.length + 1).toString(),
      question: createQuestionDto.question,
      answer: createQuestionDto.answer,
    };
    this.checkForDuplicatesByProperty('question', newQuestion.question);
    this.questions.push(newQuestion);

    return { message: 'Question added' };
  }

  getQuestionById(id: string) {
    this.checkQuestionsAvailable();

    const item = this.questions.find((q) => q.id === id);
    if (!item) {
      throw new NotFoundException('Question not found');
    }

    return { question: item.question };
  }

  getRandomQuestion() {
    this.checkQuestionsAvailable();

    const randomIndex = Math.floor(Math.random() * this.questions.length);
    const item = this.questions[randomIndex];
    return { question: item.question };
  }
}
