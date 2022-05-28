import { User } from 'src/users/entities/user.entity';

export const userStub = (): User => {
  return {
    userId: '123',
    email: 'test@example.com',
    age: 20,
    favoriteFoods: ['pizza', 'pasta'],
  };
};
