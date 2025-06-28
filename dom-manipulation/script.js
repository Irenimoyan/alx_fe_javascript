let quotes = [
    { text: "Stay hungry, stay foolish.", Category: "Motivation" },
    { text: "Believe you can and you're halfway there.", Category: "Motivation" },
    { text: "Life is whhat happens when you're buwsy making other plans", Category: "Life" },
    { text: "The biggest risk is not taking any risk...", Category: "Motivation" },
    { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", category: "Inspiration" }
];

// DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuote");
const newQuoteTextInput = document.getElementById("newQuoteText");
const newQuoteCategoryInput = document.getElementById("newQuoteCategory");


// function to show a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.innerHTML = `
    <p class="quote-text">"${quote.text}"</p>
    <p class="quote-category>- ${quote.category}</p>
    `;
}

// function to add a new quote
function addQuote() {
    const quotetext = newQuoteTextInput.value.trim();
    const quoteCategory = newQuoteCategoryInput.value.trim();

    // validate input
    if (quotetext === "" || quoteCategory == "") {
        alert("Please fill in both the Quote and Category.");
        return;
    }

    // Add new quote to array
    quotes.push({ text: quotetext, category: quoteCategory });


    // optionally, Show the newly added quote
    quoteDisplay.innerHTML = `
        <p class="quote-text">"${quotetext}"</p>
        <p class="quote-category">"${quoteCategory}"</p>
    `;


     // clear input fields
     newQuoteTextInput.value = "";
     newQuoteCategoryInput.value = "";
}

// Event listener

newQuoteBtn.addEventListener("click", showRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);