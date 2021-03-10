import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './notice-content.reducer';
import { INoticeContent } from 'app/shared/model/notice-content.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INoticeContentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const NoticeContent = (props: INoticeContentProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { noticeContentList, match, loading } = props;
  return (
    <div>
      <h2 id="notice-content-heading">
        <Translate contentKey="enbApp.noticeContent.home.title">Notice Contents</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="enbApp.noticeContent.home.createLabel">Create new Notice Content</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {noticeContentList && noticeContentList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="enbApp.noticeContent.ncType">Nc Type</Translate>
                </th>
                <th>
                  <Translate contentKey="enbApp.noticeContent.url">Url</Translate>
                </th>
                <th>
                  <Translate contentKey="enbApp.noticeContent.notice">Notice</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {noticeContentList.map((noticeContent, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${noticeContent.id}`} color="link" size="sm">
                      {noticeContent.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`enbApp.NCType.${noticeContent.ncType}`} />
                  </td>
                  <td>{noticeContent.url}</td>
                  <td>{noticeContent.notice ? <Link to={`notice/${noticeContent.notice.id}`}>{noticeContent.notice.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${noticeContent.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${noticeContent.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${noticeContent.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="enbApp.noticeContent.home.notFound">No Notice Contents found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ noticeContent }: IRootState) => ({
  noticeContentList: noticeContent.entities,
  loading: noticeContent.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NoticeContent);
