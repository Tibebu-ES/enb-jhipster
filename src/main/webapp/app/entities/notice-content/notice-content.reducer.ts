import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INoticeContent, defaultValue } from 'app/shared/model/notice-content.model';

export const ACTION_TYPES = {
  FETCH_NOTICECONTENT_LIST: 'noticeContent/FETCH_NOTICECONTENT_LIST',
  FETCH_NOTICECONTENT: 'noticeContent/FETCH_NOTICECONTENT',
  CREATE_NOTICECONTENT: 'noticeContent/CREATE_NOTICECONTENT',
  UPDATE_NOTICECONTENT: 'noticeContent/UPDATE_NOTICECONTENT',
  DELETE_NOTICECONTENT: 'noticeContent/DELETE_NOTICECONTENT',
  RESET: 'noticeContent/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INoticeContent>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type NoticeContentState = Readonly<typeof initialState>;

// Reducer

export default (state: NoticeContentState = initialState, action): NoticeContentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_NOTICECONTENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NOTICECONTENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_NOTICECONTENT):
    case REQUEST(ACTION_TYPES.UPDATE_NOTICECONTENT):
    case REQUEST(ACTION_TYPES.DELETE_NOTICECONTENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_NOTICECONTENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NOTICECONTENT):
    case FAILURE(ACTION_TYPES.CREATE_NOTICECONTENT):
    case FAILURE(ACTION_TYPES.UPDATE_NOTICECONTENT):
    case FAILURE(ACTION_TYPES.DELETE_NOTICECONTENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_NOTICECONTENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_NOTICECONTENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_NOTICECONTENT):
    case SUCCESS(ACTION_TYPES.UPDATE_NOTICECONTENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_NOTICECONTENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/notice-contents';

// Actions

export const getEntities: ICrudGetAllAction<INoticeContent> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_NOTICECONTENT_LIST,
  payload: axios.get<INoticeContent>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<INoticeContent> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NOTICECONTENT,
    payload: axios.get<INoticeContent>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<INoticeContent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NOTICECONTENT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INoticeContent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NOTICECONTENT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<INoticeContent> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NOTICECONTENT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
