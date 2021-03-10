import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Notice from './notice';
import NoticeDetail from './notice-detail';
import NoticeUpdate from './notice-update';
import NoticeDeleteDialog from './notice-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NoticeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NoticeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NoticeDetail} />
      <ErrorBoundaryRoute path={match.url} component={Notice} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={NoticeDeleteDialog} />
  </>
);

export default Routes;
