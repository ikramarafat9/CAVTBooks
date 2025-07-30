window.onload = loadBooks;

function addBook() {
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const link = document.getElementById("link").value.trim();

  if (!title || !author || !link) {
    alert("يرجى إدخال اسم الكتاب، المؤلف، ورابط التحميل");
    return;
  }

  const book = { title, author, link };
  let books = JSON.parse(localStorage.getItem("books")) || [];
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));

  displayBooks(books);
  document.getElementById("title").value = '';
  document.getElementById("author").value = '';
  document.getElementById("link").value = '';
}

function loadBooks() {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  displayBooks(books);
}

function displayBooks(books) {
  const list = document.getElementById("bookList");
  list.innerHTML = '';
  books.forEach(book => {
    const li = document.createElement("li");
    li.innerHTML = `📖 ${book.title} - ✍️ ${book.author}
      <a href="${book.link}" target="_blank" download>
        <button>📥 تحميل</button>
      </a>`;
    list.appendChild(li);
  });
}
