import { Team } from '../../types/team';
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

const teamsMock: Team[] = [
  {
    id: 0,
    name: 'Team 1',
    logo: 'logo1.png',
  },
  {
    id: 1,
    name: 'Team 2',
    logo: 'logo2.png',
  }
];

export const dbMock = {
  users: usersMock,
  teams: teamsMock,
}
