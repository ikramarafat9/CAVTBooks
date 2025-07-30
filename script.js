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
  clearInputs();
}

function clearInputs() {
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
  books.forEach((book, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      📖 ${book.title} - ✍️ ${book.author}
      <a href="${book.link}" target="_blank" download>
        <button>📥 تحميل</button>
      </a>
      <button onclick="deleteBook(${index})" style="background-color: #dc3545;">🗑️ حذف</button>
    `;
    list.appendChild(li);
  });
}

function deleteBook(index) {
  let books = JSON.parse(localStorage.getItem("books")) || [];
  books.splice(index, 1); // حذف العنصر حسب الفهرس
  localStorage.setItem("books", JSON.stringify(books));
  displayBooks(books); // تحديث العرض
}
