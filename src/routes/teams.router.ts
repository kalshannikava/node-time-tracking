import { Router } from 'express';
import { createTeam, deleteTeam, getTeam, getTeams, updateTeam } from '../controllers/teams.controller';
import { checkIfTeamExists } from '../middleware/teams.middleware';

const teamsRouter: Router = Router();

teamsRouter.use('/:id', checkIfTeamExists);

teamsRouter.get('/', getTeams);
teamsRouter.get('/:id', getTeam);
teamsRouter.post('/', createTeam);
teamsRouter.put('/:id', updateTeam);
teamsRouter.delete('/:id', deleteTeam);

export default teamsRouter;