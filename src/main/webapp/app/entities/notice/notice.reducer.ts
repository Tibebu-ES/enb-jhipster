import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INotice, defaultValue } from 'app/shared/model/notice.model';

export const ACTION_TYPES = {
  FETCH_NOTICE_LIST: 'notice/FETCH_NOTICE_LIST',
  FETCH_NOTICE: 'notice/FETCH_NOTICE',
  CREATE_NOTICE: 'notice/CREATE_NOTICE',
  UPDATE_NOTICE: 'notice/UPDATE_NOTICE',
  DELETE_NOTICE: 'notice/DELETE_NOTICE',
  SET_BLOB: 'notice/SET_BLOB',
  RESET: 'notice/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INotice>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type NoticeState = Readonly<typeof initialState>;

// Reducer

export default (state: NoticeState = initialState, action): NoticeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_NOTICE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NOTICE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_NOTICE):
    case REQUEST(ACTION_TYPES.UPDATE_NOTICE):
    case REQUEST(ACTION_TYPES.DELETE_NOTICE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_NOTICE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NOTICE):
    case FAILURE(ACTION_TYPES.CREATE_NOTICE):
    case FAILURE(ACTION_TYPES.UPDATE_NOTICE):
    case FAILURE(ACTION_TYPES.DELETE_NOTICE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_NOTICE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_NOTICE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_NOTICE):
    case SUCCESS(ACTION_TYPES.UPDATE_NOTICE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_NOTICE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/notices';

// Actions

export const getEntities: ICrudGetAllAction<INotice> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_NOTICE_LIST,
  payload: axios.get<INotice>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<INotice> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NOTICE,
    payload: axios.get<INotice>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<INotice> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NOTICE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INotice> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NOTICE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<INotice> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NOTICE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
