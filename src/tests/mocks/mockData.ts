import { User } from '../../types/user';

const usersMock: User[] = [
  {
    id: 0,
    name: "John Doe",
    email: "johndoe@gmail.com",
    timezone: '123',
  },
  {
      id: 1,
      name: "Jane Doe",
      email: "janedoe@gmail.com",
      timezone: '123',
  }
];

export const dbMock = {
  users: usersMock,
}
