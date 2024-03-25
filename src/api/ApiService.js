import {$api} from "./AxiosInstance";

export class ApiService {
  static login(params) {
    return $api.post('/browser-addon/v1/login', null, { params })
  }
  
  static checkAuth() {
    return $api.get('/browser-addon/v1/authenticated')
  }
  
  static getIps(params) {
    return $api.post('/browser-addon/v1/ip', params)
  }
  
  static sendReport(params) {
    return $api.post('/browser-addon/v1/feedback', params)
  }
  
  static recoveryPassword(params) {
    return $api.post('/browser-addon/v1/recoveryPasswordLink1', params)
  }
  
  static logout() {
    return $api.post('/browser-addon/v1/logout')
  }
  
  static getWebsites(params) {
    return $api.get('/browser-addon/v1/websites/config', { params })
  }
  
  static addWebsite(params) {
    return $api.put('/browser-addon/v1/websites/config', params)
  }
  
  static editWebsite(params) {
    return $api.post('/browser-addon/v1/websites/config', params)
  }
  
  static removeWebsites(params) {
    return $api.post('/browser-addon/v1/websites/config/delete/arr', params);
  }
  
  static getAllWebsiteIds() {
    return $api.get('/browser-addon/v1/websites/config/allIds');
  }
  
  static getUserAgentParams() {
    return $api.get('/browser-addon/v1/userAgent');
  }
  
  static sendBrowserToken(params) {
    return $api.post('/browser-addon/v1/connect/report', params);
  }
  
  static checkSelectedProxy = (params) => {
    return $api.post('/browser-addon/v1/find/ip', params)
  };
  
  static getHostsById = (params) => {
    return $api.post('/browser-addon/v1/websites/config/get/enabled/byIds', params)
  };
  
  static getFilterCountries = () => {
    return $api.get('/browser-addon/v1/find/ip/filter/date')
  };
}
