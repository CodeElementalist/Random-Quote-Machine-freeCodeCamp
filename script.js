const quoteAPI = "https://type.fit/api/quotes";

// Function to fetch data from API
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // or handle the error appropriately
    }
};

// Function to get a random quote
const getQuote = async () => {
    const allQuotes = await fetchData(quoteAPI);
    if (!allQuotes) {
        // Handle case where API did not respond correctly
        return;
    }
    const randomIndex = Math.floor(Math.random() * allQuotes.length);
    const quote = allQuotes[randomIndex].text;
    const author = allQuotes[randomIndex].author.split(",")[0];
    $("#text").text(quote);
    $("#author").text(author);
};

// Initial load of a random quote
$(document).ready(() => {
    getQuote();
});

// Event listener for new quote button
$("#new-quote").click(() => {
    getQuote();
});