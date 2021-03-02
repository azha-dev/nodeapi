import express from 'express';
import CommonRoutesConfig from '../common/common.routes.config';

class UserRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UserRoutes');
  }

  configureRoutes() {
    this.app.route('/users')
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send('List of users');
      }).post((req: express.Request, res: express.Response) => {
        res.status(200).send('Post to users');
      });

    return this.app;
  }
}

export default UserRoutes;
