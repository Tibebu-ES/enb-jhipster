import { Moment } from 'moment';
import { INoticeContent } from 'app/shared/model/notice-content.model';
import { IUser } from 'app/shared/model/user.model';

export interface INotice {
  id?: number;
  title?: string;
  message?: any;
  openTime?: string;
  closingTime?: string;
  contents?: INoticeContent[];
  editor?: IUser;
}

export const defaultValue: Readonly<INotice> = {};
