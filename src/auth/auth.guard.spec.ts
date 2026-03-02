import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  const authGuard: AuthGuard = new AuthGuard();

  it('should be defined', () => {
    expect(new AuthGuard()).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true for valid API key', () => {
      const mockRequest = {
        headers: {
          'x-api-key': 'nobody should ever commit a secret key like this',
        },
      };
      const mockContext = {
        switchToHttp: () => ({
          getRequest: () => mockRequest,
        }),
      } as ExecutionContext;

      expect(authGuard.canActivate(mockContext)).toBe(true);
    });

    it('should return false for invalid API key', () => {
      const mockRequest = {
        headers: {
          'x-api-key': 'invalid-api-key',
        },
      };
      const mockContext = {
        switchToHttp: () => ({
          getRequest: () => mockRequest,
        }),
      } as ExecutionContext;

      expect(authGuard.canActivate(mockContext)).toBe(false);
    });
  });
});
