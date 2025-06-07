import { Test, TestingModule } from '@nestjs/testing';
import { CreateManyUsersProvider } from '../provider/create-many-users.provider.js';

describe('CreateManyUsersProviderTs', () => {
  let provider: CreateManyUsersProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateManyUsersProvider],
    }).compile();

    provider = module.get<CreateManyUsersProvider>(CreateManyUsersProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
