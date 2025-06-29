const SERVER_URL = "'https://dummyjson.com/quotes'"; // Simulated API

let quotes = JSON.parse(localStorage.getItem('quotes')) || [];
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const categoryFilter = document.getElementById("categoryFilter");

window.onload = () => {
  populateCategories();
  showRandomQuote();
  restoreFilter();
  startServerSync();
};

function showRandomQuote() {
  const selectedCategory = categoryFilter.value;
  const filtered = selectedCategory === 'all'
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filtered.length === 0) {
    quoteDisplay.textContent = "No quotes available in this category.";
    return;
  }

  const random = filtered[Math.floor(Math.random() * filtered.length)];
  quoteDisplay.innerHTML = `<p>"${random.text}"</p><small>- ${random.category}</small>`;
  sessionStorage.setItem('lastViewedQuote', JSON.stringify(random));
}
function createAddQuoteForm() {
  const formContainer = document.createElement('div');
  formContainer.classList.add('form');

  const quoteInput = document.createElement('input');
  quoteInput.id = 'newQuoteText';
  quoteInput.type = 'text';
  quoteInput.placeholder = 'Enter a new quote';

  const categoryInput = document.createElement('input');
  categoryInput.id = 'newQuoteCategory';
  categoryInput.type = 'text';
  categoryInput.placeholder = 'Enter quote category';

  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  addButton.onclick = addQuote;

  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);

  document.body.appendChild(formContainer);
}

function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();
  if (!text || !category) return alert("Please fill both fields.");

  quotes.push({ text, category });
  saveQuotes();
  populateCategories();
  filterQuotes();
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function populateCategories() {
  const categories = Array.from(new Set(quotes.map(q => q.category)));
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = option.textContent = cat;
    categoryFilter.appendChild(option);
  });
}

function filterQuotes() {
  showRandomQuote();
  localStorage.setItem("lastFilter", categoryFilter.value);
}

function restoreFilter() {
  const saved = localStorage.getItem("lastFilter");
  if (saved) categoryFilter.value = saved;
}

// Export to JSON file
function exportQuotesToJson() {
  const data = new Blob([JSON.stringify(quotes)], { type: "application/json" });
  const url = URL.createObjectURL(data);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
}

// Import from JSON file
function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const imported = JSON.parse(e.target.result);
    if (!Array.isArray(imported)) return alert("Invalid file format.");
    quotes.push(...imported);
    saveQuotes();
    populateCategories();
    filterQuotes();
    alert("Quotes imported successfully!");
  };
  reader.readAsText(event.target.files[0]);
}

// Server Sync Simulation
function fetchServerQuotes() {
  return fetch(SERVER_URL)
    .then(res => res.json())
    .then(data =>
      data.slice(0, 5).map(item => ({
        text: item.title,
        category: "Server"
      }))
    );
}

function startServerSync() {
  setInterval(() => {
    fetchServerQuotes().then(serverQuotes => {
      quotes = [...serverQuotes, ...quotes];
      saveQuotes();
      populateCategories();
    });
  }, 30000); // Every 30s
}
