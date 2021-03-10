import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import NoticeContent from './notice-content';
import NoticeContentDetail from './notice-content-detail';
import NoticeContentUpdate from './notice-content-update';
import NoticeContentDeleteDialog from './notice-content-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NoticeContentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NoticeContentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NoticeContentDetail} />
      <ErrorBoundaryRoute path={match.url} component={NoticeContent} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={NoticeContentDeleteDialog} />
  </>
);

export default Routes;
