// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.scss";

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative paths, for example:
import init_page from './index';

window.addEventListener("load", () => {
	let root = document.getElementById('root');
	init_page(root);
});

/**
 * To init the FB API calls on any page in the app.
 */
window.fbAsyncInit = function() {
	FB.init({
		appId      : process.env.APP_ID,
		cookie     : true,
		xfbml      : true,
		version    : 'v5.0'
	});
		
	FB.AppEvents.logPageView();       
};
