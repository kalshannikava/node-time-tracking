import { Router } from 'express';
import { createTeam, deleteTeam, getTeam, getTeams, updateTeam } from '../controllers/teams.controller';

const teamsRouter: Router = Router();

teamsRouter.get('/', getTeams);
teamsRouter.get('/:id', getTeam);
teamsRouter.post('/', createTeam);
teamsRouter.put('/:id', updateTeam);
teamsRouter.delete('/:id', deleteTeam);

export default teamsRouter;