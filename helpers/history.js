export default {
  checkType(val) {
    if(val == 1) {
      return 'badge badge-success';
    } else if(val == 2) {
      return 'badge badge-info';
    } else if(val == 3) {
      return 'badge badge-danger';
    } else {
      return 'badge badge-default';
    }
  },
  checkBadge(val) {
    if(val == 1) {
      return 'created';
    } else if(val == 2) {
      return 'updated';
    } else if(val == 3) {
      return 'deleted';
    } else {
      return 'system';
    }
  }
}
