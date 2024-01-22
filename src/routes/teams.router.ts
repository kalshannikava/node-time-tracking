import { Router } from 'express';
import type TeamsController from '../controllers/teams.controller';
import type TeamsMiddleware from '../middleware/teams.middleware';

function teamsRouter (teamsController: TeamsController, teamsMiddleware: TeamsMiddleware): Router {
  const router: Router = Router();

  // Validation
  router.use('/:id', teamsMiddleware.checkIfTeamExists.bind(teamsMiddleware));

  // Routes
  router.get('/', teamsController.getTeams.bind(teamsController));
  router.get('/:id', teamsController.getTeam.bind(teamsController));
  router.post('/', teamsController.createTeam.bind(teamsController));
  router.put('/:id', teamsController.updateTeam.bind(teamsController));
  router.delete('/:id', teamsController.deleteTeam.bind(teamsController));

  return router;
}

export default teamsRouter;
