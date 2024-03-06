import { Router } from 'express';
import type TeamsController from '../controllers/teams.controller';
import type TeamsMiddleware from '../middleware/teams.middleware';
import AuthMiddleware from '../middleware/auth.middleware';

type TeamsRouterContext = {
  teams: {
    controller: TeamsController,
    middleware: TeamsMiddleware,
  },
  auth: {
    middleware: AuthMiddleware,
  }
}

function teamsRouter ({
  teams,
  auth,
}: TeamsRouterContext): Router {
  const router: Router = Router();

  // Validation
  router.use('/:id', teams.middleware.checkIfTeamExists.bind(teams.middleware));

  // Routes
  router.get('/', teams.controller.getTeams.bind(teams.controller));
  router.get('/:id', teams.controller.getTeam.bind(teams.controller));
  router.post('/', auth.middleware.isAuth, teams.controller.createTeam.bind(teams.controller));
  router.put('/:id', auth.middleware.isAuth, teams.controller.updateTeam.bind(teams.controller));
  router.delete('/:id', auth.middleware.isAuth, teams.controller.deleteTeam.bind(teams.controller));

  return router;
}

export default teamsRouter;
