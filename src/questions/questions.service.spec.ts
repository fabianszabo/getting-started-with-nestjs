import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsService } from './questions.service';
import { NotFoundException } from '@nestjs/common';

describe('QuestionsService', () => {
  let service: QuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionsService],
    }).compile();

    service = module.get<QuestionsService>(QuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('checkForDuplicatesByProperty', () => {
    it('should throw ConflictException if a duplicate question is found', () => {
      expect(() =>
        service.checkForDuplicatesByProperty(
          'question',
          'What keyword is used to create a variable with block scope in JavaScript?',
        ),
      ).toThrow();
    });
  });

  describe('checkQuestionsAvailable', () => {
    it('should throw NotFoundException if no questions are available', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (service as any).questions = [];
      // ^ Not the prettiest solution,
      // but it's required since the questions array
      // is prefilled with data and it's a private property

      expect(() => service.checkQuestionsAvailable()).toThrow(
        NotFoundException,
      );
    });
  });

  describe('answerQuestion', () => {
    it('returns a correct answer message when the answer matches', () => {
      // id '1' exists in the seeded data with answer 'let'
      const response = service.answerQuestion('1', { answer: 'let' });
      expect(response).toEqual({ message: 'Correct answer!' });
    });

    it('returns a wrong answer message when the answer does not match', () => {
      const response = service.answerQuestion('1', { answer: 'wrong' });
      expect(response).toEqual({ message: 'Wrong answer, try again!' });
    });

    it('throws NotFoundException when the question id does not exist', () => {
      expect(() => service.answerQuestion('999', { answer: 'x' })).toThrow(
        NotFoundException,
      );
    });
  });

  describe('createQuestion', () => {
    it('creates a new question successfully', () => {
      const response = service.createQuestion({
        question: 'What is NestJS?',
        answer: 'A progressive Node.js framework',
      });
      expect(response).toEqual({ message: 'Question added' });
    });

    it('throws ConflictException when trying to create a duplicate question', () => {
      // Attempting to create a question with the same text as an existing one
      expect(() =>
        service.createQuestion({
          question:
            'What keyword is used to create a variable with block scope in JavaScript?',
          answer: 'var',
        }),
      ).toThrow();
    });
  });

  describe('getQuestionById', () => {
    it('returns the correct question for a valid id', () => {
      const item = service.getQuestionById('1');
      expect(item).toBeDefined();
      expect(item.question).toBe(
        'What keyword is used to create a variable with block scope in JavaScript?',
      );
    });

    it('throws NotFoundException for an invalid id', () => {
      expect(() => service.getQuestionById('999')).toThrow(NotFoundException);
    });
  });

  describe('getRandomQuestion', () => {
    it('should return a random question', () => {
      const item = service.getRandomQuestion();
      expect(item).toBeDefined();
      expect(item).toHaveProperty('question');
      expect(item.question).toBeDefined();
    });
  });
});
