import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './notice.reducer';
import { INotice } from 'app/shared/model/notice.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INoticeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NoticeDetail = (props: INoticeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { noticeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="enbApp.notice.detail.title">Notice</Translate> [<b>{noticeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="title">
              <Translate contentKey="enbApp.notice.title">Title</Translate>
            </span>
          </dt>
          <dd>{noticeEntity.title}</dd>
          <dt>
            <span id="message">
              <Translate contentKey="enbApp.notice.message">Message</Translate>
            </span>
          </dt>
          <dd>{noticeEntity.message}</dd>
          <dt>
            <span id="openTime">
              <Translate contentKey="enbApp.notice.openTime">Open Time</Translate>
            </span>
          </dt>
          <dd>{noticeEntity.openTime ? <TextFormat value={noticeEntity.openTime} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="closingTime">
              <Translate contentKey="enbApp.notice.closingTime">Closing Time</Translate>
            </span>
          </dt>
          <dd>
            {noticeEntity.closingTime ? <TextFormat value={noticeEntity.closingTime} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="enbApp.notice.editor">Editor</Translate>
          </dt>
          <dd>{noticeEntity.editor ? noticeEntity.editor.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/notice" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/notice/${noticeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ notice }: IRootState) => ({
  noticeEntity: notice.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NoticeDetail);
