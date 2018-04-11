export function initPage() {

	var Page = Barba.BaseView.extend({

		namespace: 'page',

		onEnter: function() {

			//console.log('Init Page');

		},

		onLeaveCompleted: function() {



		}

	})

	Page.init();

}
