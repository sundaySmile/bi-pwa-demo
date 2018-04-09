import axios from 'axios';
import { APIRequestParams } from 'ployfill/field-types';

export const instance = axios.create({
  baseURL: 'http://vrtest-cms.aginomoto.com/', // https://vrtest-api.aginomoto.com
  headers: {
    'Content-Type': 'application/json'
  }
});

export const APIORIGIN: string = 'http://vrtest-cms.aginomoto.com/';
export const SYSTEMS: string[] = ['iOS', 'Android'];
export const PAGESIZE_OPTIONS: any[] = [
  {
    value: 10,
    label: '每页10条'
  },
  {
    value: 50,
    label: '每页50条'
  },
  {
    value: 100,
    label: '每页100条'
  },
  {
    value: 200,
    label: '每页200条'
  }
];

export const APIParamList: APIRequestParams = {
  startDate: Math.floor(new Date().getTime() / 1000) - 7 * 24 * 60 * 60,
  endDate: Math.floor(new Date().getTime() / 1000),
  version: '',
  sort: 'viewCount',
  order: 1,
  pageNum: 0,
  pageSize: 10,
  unitType: 'day'
};

export function APIParams() {
  return { ...APIParamList };
}
