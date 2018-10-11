import { BASE_PATH, FETCH_SUCCESS_STATUS } from '../constants/config';

export const isWorkPlus = () => window.navigator.userAgent.toUpperCase().indexOf('WORKPLUS') > -1;

export const fetchSuccess = (res) => (res.status === FETCH_SUCCESS_STATUS || res.code === FETCH_SUCCESS_STATUS);

const isAndroid = () => window.navigator.userAgent.toLocaleLowerCase().indexOf('android') > -1;

const isEmptyObject = (obj) => {
  let i = 0;
  for(let key in obj){
    ++i;
  }
  return i === 0 ? true : false;
}

export const request = (params) => new Promise((resolve, reject) => {
  // 添加时间戳
  var _date = new Date().getTime();
  params.path.indexOf('?') > -1 ? params.path += '&time=' + _date : params.path += '?time=' + _date;

  var _basePath = BASE_PATH;
  var defaults = {
    url: _basePath + params.path,
    type: 'GET',
    contentType: 'application/json; charset=utf-8',
    timeout: 1000 * 30,
    headers: {},
  }
  
  //附加上默认的请求参数
  for (var p in params) {
    defaults[p] = params[p];
  }
  params = defaults; 

  if (params.prefix) {
    params.url = params.url.replace('/v1/', params.prefix);
  }
  if (params.thirdPart) {
    params.url = params.path;
  }

  if (['POST', 'DELETE', 'PUT', 'OPTIONS'].indexOf(params.type.toUpperCase()) > -1 && params.contentType && params.contentType.indexOf('json') != -1) {
    params.data = (params.data && !isEmptyObject(params.data)) ? JSON.stringify(params.data) : '';
  }
  
  params.success = function(data, status, xhr) {
    if (typeof(data) === 'string') data = JSON.parse(data);
    resolve(data, status, xhr);
  };
  params.error = function(data,status,xhr) {
    var _errorMsg = '请求出错了，请重试！';
    reject(_errorMsg, status, xhr);
  };
  
  $.ajax(params);
});
