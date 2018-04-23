const host = 'http://ajax-lv/api';
const hostLogin = 'http://ajax-lv';

export const headers = { headers: {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  }
}

export const api = {
  login: hostLogin + '/oauth/token',
  register: host + '/register',
  getUserData: host + '/user',
  getUserPermission: host + '/user/permission',
  fetchCandidatesList: host + '/candidates',
  addNewCandidate: host + '/candidates/addnew',
  fetchHistoryData: host + '/history',
  viewCandidateProfile: host + '/candidate/',
}
