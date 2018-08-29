global.Page = function(page) {
  this.page = page
  this.page.setData = (data) => {
    this.page.data = {...data}
  }
}
global.App = function (app){
  this.app = app
}
global.getApp = function (){
  return this.app
}