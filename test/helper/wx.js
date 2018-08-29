class WX {
  constructor(jest) {
    this.jest = jest
  }
  request ({url, data, success, fail, complete}) {
    
  }
}

global.wx = new WX(jest);