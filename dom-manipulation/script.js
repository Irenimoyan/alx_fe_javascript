let quotes = [
    { text: "Stay hungry, stay foolish.", Category: "Motivation" },
    { text: "Believe you can and you're halfway there.", Category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans", Category: "Life" },
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

// function to dynamically create the add quote from
function createAddQuoteForm() { 
    const formContainer = document.createElement("div");
    formContainer.className = "form";

    // Create Input
    const quoteInput = document.createElement("input");
    quoteInput.id = "newQuoteText";
    quoteInput.type = "text";
    quoteInput.placeholder = "Enter Quote"

    //create category
    const quoteCategory = document.createElement('input');
    quoteCategory.id = "newQuoteCategory";
    quoteCategory.type = "text";
    quoteCategory.placeholder="Enter Category"
    
    // Create button
    const addButton = document.createElement("button");
    addButton.textContent = "➕ Add Quote";
    addButton.onclick = addQuote;

    // Append all the form container
    formContainer.appendChild(quoteInput);
    formContainer.appendChild(quoteCategory);
    formContainer.appendChild(addButton);

    // Append the form container to the body or the specific section
    document.body.appendChild(formContainer);
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
// addQuoteBtn.addEventListener("click", addQuote);
createAddQuoteForm(); //call the required function