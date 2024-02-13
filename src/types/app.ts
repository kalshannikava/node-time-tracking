import type TeamsController from "../controllers/teams.controller"
import type UsersController from "../controllers/users.controller"
import type WorkPeriodsController from "../controllers/workPeriods.controller"
import type TeamsMiddleware from "../middleware/teams.middleware"
import type UsersMiddleware from "../middleware/users.middleware"
import type WorkPeriodsMiddleware from "../middleware/workPeriod.middleware"

export type RoutesConfig = {
  workPeriods: {
    middleware: WorkPeriodsMiddleware,
    controller: WorkPeriodsController,
  },
  teams: {
    middleware: TeamsMiddleware,
    controller: TeamsController,
  },
  users: {
    middleware: UsersMiddleware,
    controller: UsersController,
  },
}
