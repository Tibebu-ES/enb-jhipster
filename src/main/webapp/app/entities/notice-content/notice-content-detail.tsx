import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './notice-content.reducer';
import { INoticeContent } from 'app/shared/model/notice-content.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INoticeContentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NoticeContentDetail = (props: INoticeContentDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { noticeContentEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="enbApp.noticeContent.detail.title">NoticeContent</Translate> [<b>{noticeContentEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="ncType">
              <Translate contentKey="enbApp.noticeContent.ncType">Nc Type</Translate>
            </span>
          </dt>
          <dd>{noticeContentEntity.ncType}</dd>
          <dt>
            <span id="url">
              <Translate contentKey="enbApp.noticeContent.url">Url</Translate>
            </span>
          </dt>
          <dd>{noticeContentEntity.url}</dd>
          <dt>
            <Translate contentKey="enbApp.noticeContent.notice">Notice</Translate>
          </dt>
          <dd>{noticeContentEntity.notice ? noticeContentEntity.notice.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/notice-content" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/notice-content/${noticeContentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ noticeContent }: IRootState) => ({
  noticeContentEntity: noticeContent.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NoticeContentDetail);
