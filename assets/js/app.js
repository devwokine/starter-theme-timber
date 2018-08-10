import 'nodelist-foreach-polyfill'
import FastClick from 'fastclick';
import * as utils from './utils.js';

import Header from './modules/header.js';

import {initHome} from './pages/home.js';
import {initPage} from './pages/page.js';

class App {

  constructor(opt = {}) {

    //Declarations
    this.sy = 0;
    this.devMode = true;
    this.DOM = {};
    this.DOM.body = document.body;
    this.DOM.footer = document.querySelector('footer');
    this.DOM.barbaWrapper = document.querySelector('#barba-wrapper');

    //Signature Wokine
    window.scrollTo(0,0)
    console.log("%cCreated by Wokine, with ❤","color: #000; padding: 5px 0px 1px; border-bottom:2px solid #71d1c2;"),console.log("%chttp://wokine.com","color:#ccc")

    this.init();
    this.addEvents();
    this.intro();

  }

  init() {

    //DevMode ( infos navigateur )
    if (this.devMode) {
  		console.log('DEVMODE BIATCH');
      console.log(window.Sniff);
    }

    //Resets
    FastClick(this.DOM.body);
    this.DOM.body.scrollTop = document.documentElement.scrollTop = 0;
    history.scrollRestoration = 'manual';

    // Create Header
  	const header = new Header(document.querySelector('body > header'));

    //Barba
    Barba.Dispatcher.on('newPageReady', (currentStatus, oldStatus, container) => {

      // newPageReady

      // Animations
      if (!window.Sniff.features.mobile) {
        this.initPrllx(container);
        this.initInView(container);
      }

    });

    Barba.Dispatcher.on('linkClicked', (HTMLElement, MouseEvent) => {

      //linkClicked

    })

    Barba.Dispatcher.on('initStateChange', function() {

      //initStateChange
  		if (typeof ga === 'function') {
  			ga('send', 'pageview', location.pathname);
  		}

  	});

    var pageTransition = Barba.BaseTransition.extend({

  		start: function() {

  		  Promise.all([this.newContainerLoading, this.transitionOut()])
  		  .then(this.transitionIn.bind(this));

  		},

  		transitionOut: function() {

  			let deferred = Barba.Utils.deferred();
  			let oldContainer = this.oldContainer;

			  const pageOut = new TimelineMax({ paused:true, onComplete:()=>{

          //Close Menu if Open
          if(header.menuOpen){
            var click = new Event('click');
            header.DOM.toggleClose.dispatchEvent(click);
          }

          window.scrollTo(0,0);
				  deferred.resolve();

			  }});

        pageOut.to(oldContainer, 0.8, {opacity:0, ease:Power3.easeOut}, 0);
        pageOut.play();

  			return deferred.promise;

  		},

  		transitionIn: function() {

  			var _this = this;

  			this.oldContainer.style.display = "none";
  			this.newContainer.style.visibility = 'visible';

		    const pageIn = new TimelineMax({ paused:true, onComplete:()=>{
					_this.done();
				}})

        pageIn.from(this.newContainer, 1.2, {opacity:0, ease:Power3.easeOut}, 0);
        pageIn.play();

  		}

  	});

  	Barba.Pjax.getTransition = function() {
  	  return pageTransition;
  	};

  	//routes
  	initHome();
  	initPage();

    Barba.Pjax.start();

  }

  addEvents() {

    window.addEventListener('scroll', (e) => {
  		this.sy = window.pageYOffset || document.documentElement.scrollTop;
  	})

  }

  initPrllx(container) {

	  const TLPrllxs = []
	  const prllxs = container.querySelectorAll('*[data-prllx]');
	  prllxs.forEach((item) => {

		    let prllxTL = new TimelineMax({ paused: true});
        TweenMax.set(item, { y: -1 * item.getAttribute('data-prllx') });
  	    prllxTL.to(item, 1, { y:item.getAttribute('data-prllx'), overwrite:"all", ease:Power0.easeNone });
		    TLPrllxs.push(prllxTL);

	  });

	  var prllxRender = function (){

	    prllxs.forEach((item, index) => {
        let from = item.getBoundingClientRect().top + this.sy - window.innerHeight ;
	      let norm = utils.clamp(utils.normalize(this.sy,  from ,  item.getBoundingClientRect().top + this.sy + item.offsetHeight), 0, 1);
		    TLPrllxs[index].progress(norm);
	    });

	  }

	  TweenMax.ticker.addEventListener("tick", prllxRender, this, true, 1);

  }

  initInView(container) {


    //fadeIn
    const fadeInElems = container.querySelectorAll('.fadeInView');

    if (fadeInElems) {
      fadeInElems.forEach((elem) => {
        elem.fadeInTL = new TimelineMax({ paused: true});
        elem.fadeInTL.from(elem, 1, {y:80, opacity:0, ease:Power3.easeOut}, 0);
      })

      inView("main .fadeInView").on('enter', el => {
        if(!el.done)  el.fadeInTL.duration(animationDuration).play();
      }).on('exit', el => {
        el.done = true;
        //el.fadeInTL.duration(0.2).reverse();
      });

    }

    //letterIn
    const lettersInElems = container.querySelectorAll('.lettersInView');
    if (lettersInElems) {

      lettersInElems.forEach((elem) => {
        elem.splitLetters = new SplitText(elem, {type:"chars"});
        elem.lettersInTL = new TimelineMax({ paused: true});
        elem.lettersInTL.staggerFrom(elem.splitLetters.chars, 1, {y:20, opacity:0, ease:Power3.easeOut}, 0.015, 0);
      })

      inView("main .lettersInView").on('enter', el => {
        if(!el.done)  el.lettersInTL.duration(animationDuration).play();
      }).on('exit', el => {
        el.done = true;
        el.innerHTML = el.splitLetters._originals;
        //el.lettersInTL.duration(0.2).reverse();
      });

    }

    //linesIn
    const linesInElems = container.querySelectorAll('.linesInView');
    if (linesInElems) {

      linesInElems.forEach((elem) => {
        elem.splitLines = new SplitText(elem, {type:"lines"});
        elem.linesInTL = new TimelineMax({ paused: true});
        elem.linesInTL.staggerFrom(elem.splitLines.lines, 1, {y:20, opacity:0, ease:Power3.easeOut}, 0.05, 0.2);
      })

      inView("main .linesInView").on('enter', el => {
        if(!el.done)  el.linesInTL.duration(animationDuration * 1.5).play();
      }).on('exit', el => {
        el.done = true;
        el.innerHTML = el.splitLines._originals;
        //el.linesInTL.duration(0.2).reverse();
      });

    }

    inView.offset({
        top: -120,
        left:-50,
        right:-50,
        bottom: 0,
    });

  }

  intro() {

    const intro = new TimelineMax({ paused:true, onStart:()=>{
      this.DOM.body.classList.remove('is-loading');
    }})

    intro.from(this.DOM.body, 1.2, {opacity:0, ease:Power3.easeOut}, 0.3)
    intro.play();

  }

}

const app = new App();
