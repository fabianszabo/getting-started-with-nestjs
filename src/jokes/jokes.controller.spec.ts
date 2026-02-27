import { Test, TestingModule } from '@nestjs/testing';
import { JokesController } from './jokes.controller';
import { JokesService } from './jokes.service';

describe('JokesController', () => {
  let controller: JokesController;

  const randomJokeMock = jest.fn().mockReturnValue('This is a joke');

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: JokesService, useValue: { randomJoke: randomJokeMock } },
      ],
      controllers: [JokesController],
    }).compile();

    controller = module.get<JokesController>(JokesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('randomJoke', () => {
    it('should call service.randomJoke and return its result', () => {
      const result = controller.randomJoke();
      expect(randomJokeMock).toHaveBeenCalled();
      expect(result).toEqual('This is a joke');
    });
  });
});
