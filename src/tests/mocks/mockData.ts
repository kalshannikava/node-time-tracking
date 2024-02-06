import type { Team } from '../../types/team';
import type { User } from '../../types/user';
import type { WorkPeriod } from '../../types/workPeriod';

const usersMock: User[] = [
  {
    id: 0,
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    timezone: '123',
  },
  {
      id: 1,
      name: 'Jane Doe',
      email: 'janedoe@gmail.com',
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

const workPeriodsMock: WorkPeriod[] = [
  {
    id: 0,
    from: 'January 1, 2023',
    to: 'April 15, 2023',
    weekDays: '25',
    userId: 1,
    teamId: 0,
  },
  {
    id: 2,
    from: 'March 5, 2023',
    to: 'May 30, 2023',
    weekDays: '20',
    userId: 0,
    teamId: 0,
  },
];

export const dbMock = {
  users: usersMock,
  teams: teamsMock,
  workPeriods: workPeriodsMock,
}
