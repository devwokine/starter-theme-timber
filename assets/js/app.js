import sniffer from 'sniffer'
import FastClick from 'fastclick'
import * as utils from './utils.js';
import {initHome} from './pages/home.js';

class App {

  constructor(opt = {}) {

    window.scrollTo(0,0)
    console.log("%cCreated by wokine","color: #000; padding: 5px 0px;"),console.log("%chttp://wokine.com","color:#ccc")

    this.init()
    this.addEvents()

  }

  init() {

	FastClick(document.body);

    //removeLoading
    document.querySelector('body').classList.remove('is-loading');

	//routes
	initHome();

  }

  addEvents() {

    window.onbeforeunload = function() {window.scrollTo(0,0);}

  }

}

const app = new App();
