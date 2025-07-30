// 📚 كتب ثابتة تظهر لجميع المستخدمين (داخل الكود)
const defaultBooks = [
  {
    title: "مقدمة في الذكاء الاصطناعي",
    author: "أحمد الزعبي",
    link: "books/ai-book.pdf"
  },
  {
    title: "تعلم البرمجة",
    author: "سارة الجبور",
    link: "books/programming.pdf"
  }
];

// 🚀 تحميل الكتب عند فتح الصفحة
window.onload = loadBooks;

// ➕ إضافة كتاب من النموذج
function addBook() {
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const link = document.getElementById("link").value.trim();

  if (!title || !author || !link) {
    alert("يرجى إدخال اسم الكتاب، المؤلف، ورابط التحميل");
    return;
  }

  const book = { title, author, link };
  let userBooks = JSON.parse(localStorage.getItem("userBooks")) || [];
  userBooks.push(book);
  localStorage.setItem("userBooks", JSON.stringify(userBooks));

  loadBooks(); // إعادة التحميل بعد الإضافة
  clearInputs();
}

// 🧹 مسح الحقول بعد الإضافة
function clearInputs() {
  document.getElementById("title").value = '';
  document.getElementById("author").value = '';
  document.getElementById("link").value = '';
}

// 📥 تحميل الكتب الثابتة + كتب المستخدم
function loadBooks() {
  const userBooks = JSON.parse(localStorage.getItem("userBooks")) || [];
  const allBooks = [...defaultBooks, ...userBooks]; // دمج القائمتين
  displayBooks(allBooks, userBooks.length);
}

// 📖 عرض جميع الكتب (مع إمكانية حذف كتب المستخدم فقط)
function displayBooks(books, userBooksCount) {
  const list = document.getElementById("bookList");
  list.innerHTML = '';
  books.forEach((book, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      📖 ${book.title} - ✍️ ${book.author}
      <a href="${book.link}" target="_blank" download>
        <button>📥 تحميل</button>
      </a>
      ${
        index >= defaultBooks.length
          ? `<button onclick="deleteBook(${index - defaultBooks.length})" style="background-color: #dc3545;">🗑️ حذف</button>`
          : ''
      }
    `;
    list.appendChild(li);
  });
}

// ❌ حذف كتاب من كتب المستخدم فقط
function deleteBook(index) {
  let userBooks = JSON.parse(localStorage.getItem("userBooks")) || [];
  userBooks.splice(index, 1);
  localStorage.setItem("userBooks", JSON.stringify(userBooks));
  loadBooks(); // تحديث العرض
}



