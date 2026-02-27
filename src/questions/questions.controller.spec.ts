import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

describe('QuestionsController', () => {
  let controller: QuestionsController;

  const getRandomQuestionMock = jest
    .fn()
    .mockReturnValue({ question: 'What is 1+1?' });
  const getQuestionByIdMock = jest
    .fn()
    .mockReturnValue({ question: 'What is 1+1?' });
  const createQuestionMock = jest
    .fn()
    .mockReturnValue({ message: 'Question added' });
  const answerQuestionMock = jest
    .fn()
    .mockReturnValue({ message: 'Correct answer!' });

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: QuestionsService,
          useValue: {
            getRandomQuestion: getRandomQuestionMock,
            getQuestionById: getQuestionByIdMock,
            createQuestion: createQuestionMock,
            answerQuestion: answerQuestionMock,
          },
        },
      ],
      controllers: [QuestionsController],
    }).compile();

    controller = module.get<QuestionsController>(QuestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('randomQuestion', () => {
    it('should call service.getRandomQuestion and returns its result', () => {
      const result = controller.randomQuestion();
      expect(getRandomQuestionMock).toHaveBeenCalled();
      expect(result).toEqual({ question: 'What is 1+1?' });
    });
  });

  describe('getQuestionById', () => {
    it('should call service.getQuestionById with the correct id and returns its result', () => {
      const result = controller.getQuestionById('123');
      expect(getQuestionByIdMock).toHaveBeenCalledWith('123');
      expect(result).toEqual({ question: 'What is 1+1?' });
    });
  });

  describe('createQuestion', () => {
    it('should call service.createQuestion with the correct DTO and returns its result', () => {
      const createQuestionDto = { question: 'What is 1+1?', answer: '2' };
      const result = controller.createQuestion(createQuestionDto);
      expect(createQuestionMock).toHaveBeenCalledWith(createQuestionDto);
      expect(result).toEqual({ message: 'Question added' });
    });
  });

  describe('answerQuestion', () => {
    it('should call service.answerQuestion with the correct id and DTO and returns its result', () => {
      const answerQuestionDto = { answer: '2' };
      const result = controller.answerQuestion('123', answerQuestionDto);
      expect(answerQuestionMock).toHaveBeenCalledWith('123', answerQuestionDto);
      expect(result).toEqual({ message: 'Correct answer!' });
    });
  });
});
