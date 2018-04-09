import axios from 'axios';
import { formatterDataShow as FormatOverview } from './formatterData';
import FormatTopic from './formatterTopicData.js';
import FormatProgram from './formatterProgramData';
import FormatLive from './formatterLiveData.js';
import FormatProgramSet from './formatterProgramSetData.js';
import {
  APIORIGIN,
  instance
} from './meta';
import {
  APIRequestParams
} from '../ployfill/field-types';

const axiosData = (rsp) => {
  if (typeof rsp === 'string' && rsp) {
    const result = JSON.parse(rsp);
    return result.data;
  } else {
    return rsp.data;
  }
};
const errData1 = {};
// const errData2 = {};

const model = {
  // mockTableData: mockItemList,
  // bianalysis/overView
  getLastTimeUpdate() {
    return instance.get('/newVR-bi/bianalysis/ops/getUpdatedTime').then(axiosData).then((response) => {
      return response.result;
    });
  },
  getUserInfo() {
    return axios.get('http://vr-bi.aginomoto.com/user.json')
      .then((response) => {
        return response.data;
      });
  },
  getConfig() {

    const url = `${APIORIGIN}/newVR-arrange/arrange/version/getAllVersions`;
    // const url = 'https://vr-api.aginomoto.com/newVR-service/appservice/program/findByCode?code=ad0fd99733f74e079ee4718a3d4a99db';

    // if ('caches' in window) {
    //   /*
    //    * Check if the service worker has already cached this city's weather
    //    * data. If the service worker has the data, then display the cached
    //    * data while the app fetches the latest data.
    //    */
    //   const cacheVersions = caches.match(url);
    //   if (Object.keys(cacheVersions).length > 0) {
    //     return cacheVersions.then(function(response) {
    //       if (response) {
    //         return response.json().then(function updateFromCache(json) {
    //           console.log('cache 结构', json);
    //           return json.data;
    //         });
    //       }
    //     });
    //   }
    // }
    // return instance.get('/newVR-arrange/arrange/version/getAllVersions')
    //   .then((rsp) => {
    //     let result = rsp;
    //     // console.log('rsp:', rsp);
    //     if (typeof rsp !== 'object') {
    //       result = JSON.parse(rsp);
    //     }

    //     return result.data.data;
    //   }
    // );

    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        return json.data;
      });

  },
  getDataShow(data: APIRequestParams) {
    return instance.get('/newVR-bi/bianalysis/overview/search', {
      params: data
    }).then((rsp) => {
      if (typeof rsp === 'string' && rsp) {
        const result = JSON.parse(rsp);
        return result.data.result;
      } else {
        return rsp.data.result;
      }
    }).then(response => {
      if (response && response.data) {
        const {
          curPageNum,
          totalPageNum,
          data
        } = response;
        const formatedResponse = FormatOverview(data);
        return {
          curPageNum,
          totalPageNum,
          data: formatedResponse
        };
      }
      return response;
    });
  },
  getProgram(data: APIRequestParams) {
    return instance.get('/newVR-bi/bianalysis/content/search', {
      params: data
    }).then((rsp) => {
      if (typeof rsp !== 'object' && rsp) {
        const result = JSON.parse(rsp);
        return result.data.result;
      } else {
        return rsp.data.result;
      }
    }).then(response => {
      if (response && response.data) {
        // console.log(response);
        const {
          curPageNum,
          totalPageNum,
          data
        } = response;
        const formatedResponse = FormatProgram.formatterDataShow(data);
        return {
          curPageNum,
          totalPageNum,
          data: formatedResponse
        };
      }
      return response;
    });
    // .catch(errData1);
  }
  // getBroadcast(data) {
  //   return instance.get('/newVR-bi/bianalysis/live/search', {
  //     params: data
  //   }).then((rsp) => {
  //     if (typeof rsp !== 'object' && rsp) {
  //       const result = JSON.parse(rsp);
  //       return result.data.result;
  //     } else {
  //       return rsp.data.result;
  //     }
  //   }).then(response => {
  //     if (response && response.data) {
  //       // console.log(response);
  //       const {
  //         curPageNum,
  //         totalPageNum,
  //         data
  //       } = response;
  //       const formatedResponse = FormatLive.formatterDataShow(data);
  //       return {
  //         curPageNum,
  //         totalPageNum,
  //         data: formatedResponse
  //       };
  //     }
  //     return response;
  //   });
  // },
  // getTopic(data) {
  //   return instance.get('/newVR-bi/bianalysis/topic/search', {
  //     params: data
  //   }).then((rsp) => {
  //     if (typeof rsp !== 'object' && rsp) {
  //       const result = JSON.parse(rsp);
  //       return result.data.result;
  //     } else {
  //       return rsp.data.result;
  //     }
  //   }).then(response => {
  //     if (response && response.data) {
  //       const {
  //         curPageNum,
  //         totalPageNum,
  //         data
  //       } = response;
  //       const formatedResponse = FormatTopic.formatterDataShow(data);
  //       return {
  //         curPageNum,
  //         totalPageNum,
  //         data: formatedResponse
  //       };
  //     }
  //     return response;
  //   });
  // },
  // getProgramSet(data) {
  //   return instance.get('/newVR-bi/bianalysis/programSet/search', {
  //     params: data
  //   }).then((rsp) => {
  //     if (typeof rsp !== 'object' && rsp) {
  //       const result = JSON.parse(rsp);
  //       return result.data.result;
  //     } else {
  //       return rsp.data.result;
  //     }
  //   }).then(response => {
  //     if (response && response.data) {
  //       const {
  //         curPageNum,
  //         totalPageNum,
  //         data
  //       } = response;
  //       const formatedResponse = FormatProgramSet.formatterDataShow(data);
  //       return {
  //         curPageNum,
  //         totalPageNum,
  //         data: formatedResponse
  //       };
  //     }
  //     return response;
  //   });
  // },
};

export default model;
