import * as utils from '../utils.js';

class Header {

  constructor(el) {

    //console.log('initHeader');

	  this.DOM = {};
	  this.DOM.el = el;
	  this.DOM.body = document.body;
	  this.DOM.brand = this.DOM.el.querySelector('.brand');
    this.DOM.toggleOpen = this.DOM.el.querySelector('.toggle__menu__open');
	  this.DOM.toggleClose = this.DOM.el.querySelector('.toggle__menu__close');
    this.DOM.menuContainer = this.DOM.el.querySelector('nav');
    this.menuOpen = false;

	  this.init();

  }

  init() {

    //animation Open
    const menuOpenTL = new TimelineMax({ paused: true});

  	//toggle
  	this.DOM.toggleOpen.addEventListener('click',(e) => {

  		e.preventDefault();
  		this.DOM.body.classList.toggle('showMenu');

      //if Openning
  		if ( this.DOM.body.classList.contains('showMenu') ) {

        this.menuOpen = true;
        this.DOM.body.style.overflow = "hidden";
        this.DOM.menuContainer.style.visibility = "visible";

        //Animation
        menuOpenTL.totalDuration(2).restart();

  		} else {

        this.menuOpen = false;

        //Animation Reverse
        menuOpenTL.totalDuration(1).reverse();

        this.DOM.body.style.overflow = "auto";
        this.DOM.menuContainer.style.visibility = "hidden";

  		}

  	});

    //toggle
    this.DOM.toggleClose.addEventListener('click',(e) => {

      e.preventDefault();
      this.DOM.body.classList.toggle('showMenu');

      //if Openning
      if ( this.DOM.body.classList.contains('showMenu') ) {

        this.menuOpen = true;
        this.DOM.body.style.overflow = "hidden";
        this.DOM.menuContainer.style.visibility = "visible";

        //Animation
        menuOpenTL.totalDuration(2).restart();

      } else {

        this.menuOpen = false;

        //Animation Reverse
        menuOpenTL.totalDuration(1).reverse();

        this.DOM.body.style.overflow = "auto";
        this.DOM.menuContainer.style.visibility = "hidden";

      }

    });


    // Links Click
    const links = this.DOM.menuContainer.querySelectorAll('.nav__link')
    links.forEach((elem) => {

      elem.addEventListener('click',(e)=> {
        if ( this.DOM.menuContainer.querySelector('.active') != null ) {
           this.DOM.menuContainer.querySelector('.active').classList.remove('active');
        }
        e.currentTarget.parentNode.classList.add('active');
      })

    });

    // Brand Click
    this.DOM.brand.addEventListener('click',(e)=> {

      if ( this.DOM.menuContainer.querySelector('.active') != null ) {
         this.DOM.menuContainer.querySelector('.active').classList.remove('active');
      }

    })

  }

}

export default Header;
