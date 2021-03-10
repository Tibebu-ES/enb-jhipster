import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { INotice } from 'app/shared/model/notice.model';
import { getEntities as getNotices } from 'app/entities/notice/notice.reducer';
import { getEntity, updateEntity, createEntity, reset } from './notice-content.reducer';
import { INoticeContent } from 'app/shared/model/notice-content.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INoticeContentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NoticeContentUpdate = (props: INoticeContentUpdateProps) => {
  const [noticeId, setNoticeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { noticeContentEntity, notices, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/notice-content');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getNotices();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...noticeContentEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="enbApp.noticeContent.home.createOrEditLabel">
            <Translate contentKey="enbApp.noticeContent.home.createOrEditLabel">Create or edit a NoticeContent</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : noticeContentEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="notice-content-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="notice-content-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="ncTypeLabel" for="notice-content-ncType">
                  <Translate contentKey="enbApp.noticeContent.ncType">Nc Type</Translate>
                </Label>
                <AvInput
                  id="notice-content-ncType"
                  type="select"
                  className="form-control"
                  name="ncType"
                  value={(!isNew && noticeContentEntity.ncType) || 'IMAGE'}
                >
                  <option value="IMAGE">{translate('enbApp.NCType.IMAGE')}</option>
                  <option value="VIDEO">{translate('enbApp.NCType.VIDEO')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="urlLabel" for="notice-content-url">
                  <Translate contentKey="enbApp.noticeContent.url">Url</Translate>
                </Label>
                <AvField id="notice-content-url" type="text" name="url" />
              </AvGroup>
              <AvGroup>
                <Label for="notice-content-notice">
                  <Translate contentKey="enbApp.noticeContent.notice">Notice</Translate>
                </Label>
                <AvInput id="notice-content-notice" type="select" className="form-control" name="notice.id">
                  <option value="" key="0" />
                  {notices
                    ? notices.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/notice-content" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  notices: storeState.notice.entities,
  noticeContentEntity: storeState.noticeContent.entity,
  loading: storeState.noticeContent.loading,
  updating: storeState.noticeContent.updating,
  updateSuccess: storeState.noticeContent.updateSuccess,
});

const mapDispatchToProps = {
  getNotices,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NoticeContentUpdate);
