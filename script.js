// vanilla javascript document ready equivalent
var ready = function ( fn ) {
    if ( typeof fn !== 'function' ) return;
    if ( document.readyState === 'interactive' || document.readyState === 'complete' ) {
        return fn();
    }
    document.addEventListener( 'DOMContentLoaded', fn, false );
};

ready(function() {
    // helper functions
    let $QSA = (elem) => document.querySelectorAll(elem),
        $QS = (elem) => document.querySelector(elem);

    // get quote from api
    async function getQuote() {
        let url = 'https://api.icndb.com/jokes/random';
        let result = await (await fetch(url)).json();
        return result;
    }

    async function loadGetQuote(time) {
        try {
            let data = await getQuote();
            insertQuote(data, time);
        }
        catch(err) {
            console.error(`ERROR(${err.code}): ${err.message}`);
        }
    };

    // insert quote to DOM
    function insertQuote(data, time) {
        let joke = data.value.joke;
        let socialText = data.value.joke.replace(/&quot;/g, "\"");

        $QS('.wrap').classList.remove('wrap--showup');
        $QS('.quote').innerHTML = joke;
        $QS(".social-twitter").setAttribute('href', `https://twitter.com/intent/tweet?text=${socialText}`);

        setTimeout(() => {
            $QS('.wrap').classList.add('wrap--showup');
        }, time);
    }

    // get a new joke on click
    $QSA('.get-quote-btn, .quote-img').forEach(elem => elem.addEventListener('click', () => {
        loadGetQuote(1000);
    }));

    // initial load
    loadGetQuote(0);
// end document ready
});
