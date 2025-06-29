let quotes = [];

// Load quotes and last selected filter
window.onload = function () {
  loadQuotes();
  populateCategories();
  const savedFilter = localStorage.getItem("selectedCategory");
  if (savedFilter) {
    document.getElementById("categoryFilter").value = savedFilter;
    filterQuotes();
  } else {
    displayQuotes(quotes);
  }
};

function loadQuotes() {
  const stored = localStorage.getItem("quotes");
  quotes = stored ? JSON.parse(stored) : [];
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function displayQuotes(filteredQuotes) {
  const container = document.getElementById("quoteDisplay");
  container.innerHTML = "";
  if (filteredQuotes.length === 0) {
    container.innerHTML = "<p>No quotes to show.</p>";
    return;
  }

  filteredQuotes.forEach((q) => {
    const quoteEl = document.createElement("div");
    quoteEl.classList.add("quote");
    quoteEl.innerHTML = `<strong>${q.text}</strong><br><span class="category">— ${q.category}</span>`;
    container.appendChild(quoteEl);
  });
}

function populateCategories() {
  const select = document.getElementById("categoryFilter");
  // Clear old options except "All"
  select.innerHTML = `<option value="all">All Categories</option>`;

  const categories = [...new Set(quotes.map((q) => q.category))];
  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selected);
  if (selected === "all") {
    displayQuotes(quotes);
  } else {
    const filtered = quotes.filter((q) => q.category === selected);
    displayQuotes(filtered);
  }
}

function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text === "" || category === "") {
    alert("Please fill in both fields.");
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotes();
  populateCategories();
  filterQuotes(); // re-filter in case it's the same category

  // Clear input
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}
