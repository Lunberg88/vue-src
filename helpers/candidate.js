export default {
  showcurr(val) {
    if(val == '1') {
      return '$';
    } else if(val == '2') {
      return '€';
    } else if(val == '3') {
      return '₽';
    } else if(val == '4') {
      return '₴';
    }
  },
  checkStack(val) {
    if(val == 1) {
      return val = 'Frontend';
    }
    else if(val == 2) {
      return val = 'Backend';
    }
    else if(val == 3) {
      return val = 'FullStack';
    }
    else if(val == 4) {
      return val = 'Mobile';
    }
    else if(val == 5) {
      return val = 'Design';
    }
    else if(val == 6) {
      return val = 'Traders';
    }
    else if(val == 7) {
      return val = 'DevOps';
    }
    else if(val == 8) {
      return val = 'Project Manager';
    }
    else if(val == 9) {
      return val = 'Product Manager';
    }
    else if(val == 10) {
      return val = 'Sales Manager';
    }
    else if(val == 11) {
      return val = 'CTO';
    }
  },
  tagChips(tags) {
    let tag = tags.split(',');
    for(let i=0; i<tag.length; i++) {
      tag[i] = `<span class="badge badge-pill badge-danger"> ${tag[i]} </span>`;
    }
    tag = tag.join(' ');
    return tag;
  }
}
