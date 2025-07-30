// 📚 كتب ثابتة تظهر لجميع المستخدمين (داخل الكود)
const defaultBooks = [
  {
    title: "التعاون والتواصل مع اعضاء الفريق والادارة لاغراض تطوير التطبيقات",
    author: "CAVT",
    link: "books/1.pdf"
  },
  {
    title: "الحفاظ على وثائق العمل في جميع مراحل تطوير التطبيق",
    author: "CAVT",
    link: "books/2.pdf"
  }
  {
    title: "المساهمة في عملية تخطيط وتصميم التطبيق",
    author: "CAVT",
    link: "books/3.pdf"
  },
  {
    title: "مقدمة في علم البرمجة",
    author: "CAVT",
    link: "books/4.pdf"
  }
{
    title: "المساهمة في تطوير التطبيقات",
    author: "CAVT",
    link: "books/5.pdf"
  },
  {
    title: "المعرفة بقواعد البيانات العلاقية (SQL) او قواعد البيانات غير العلائقية (NoSQL) بالاضافة إلى نمذجة البيانات وتحسين الاستعلام",
    author: "CAVT",
    link: "books/6.pdf"
  }
{
    title: "المساهمة في اختبار وتصحيح التطبيق وتوثيقة",
    author: "CAVT",
    link: "books/7.pdf"
  },
  {
    title: "أمن التطبيقات وضمان جودة التطبيق",
    author: "CAVT",
    link: "books/8.pdf"
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



