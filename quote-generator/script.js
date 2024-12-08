const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuote = [];

//show Loading;

function loading() {
    
    loader.hidden = false;
    quoteContainer.hidden = true;

}

//Hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//show new Quote;
function newQuote() {
    loading()
    //Pick a random quote form apiQuotes array
    const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)]; 

    //Check if author field is blank and replace it with "Unknown"
    if (!quote.author) {
    authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }

    //Check quote length to determine styling
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // set quote, hide loader

    quoteText.textContent = quote.text;
    complete();
}


function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`
    window.open(twitterUrl,'_blank')
}
 
//Event listeners;

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)

// Get Quotes Form API
//async fetch api
async function getQuotes() {
    // loading()
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuote = await response.json();
        newQuote() 
    } catch (error) {
         alert(error)
    }
}

//on Load;
getQuotes();
// newQuote();
