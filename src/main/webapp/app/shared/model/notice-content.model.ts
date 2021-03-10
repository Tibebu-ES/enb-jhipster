import { INotice } from 'app/shared/model/notice.model';
import { NCType } from 'app/shared/model/enumerations/nc-type.model';

export interface INoticeContent {
  id?: number;
  ncType?: NCType;
  url?: string;
  notice?: INotice;
}

export const defaultValue: Readonly<INoticeContent> = {};
