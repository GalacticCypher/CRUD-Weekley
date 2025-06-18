
async function createBook() {
    const book = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        genre: document.getElementById("genre").value,
        price: document.getElementById("price").value,
        quantity: document.getElementById("quantity").value,
    };
try {
    const response = await fetch("http://localhost:5000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book)
    });
   
   if (!response.ok) {
    throw new Error("Failed to create Book")
   }

        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("genre").value = "";
        document.getElementById("price").value = "";
        document.getElementById("quantity").value = "";

    getBooks();
  }
  catch (error) {
      console.error("Error Creating book:", error);
      alert("Failed to create the book, please try again.")
    }
}

async function getBooks() {
    const response = await fetch("http://localhost:5000/books");
    const books = await response.json();

    const list = document.getElementById("bookList");
    list.innerHTML = "";
    books.forEach(book => {
        const item = document.createElement("li");
        item.textContent = `${book.title} by ${book.author} - ${book.genre} ($${book.price}) quantity : ${book.quantity} `;
        list.appendChild(item);
    });
}

async function removeBook() {
  const book = {
    title: document.getElementById("remove").value,
  };

  try {
    const response = await fetch("http://localhost:5000/books", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book)
    });

    if (!response.ok) {
      throw new Error("Failed to delete book");
    }
    document.getElementById("remove").value = "";
    getBooks();
  } catch (error) {
    console.error("Error deleting book:", error);
    alert("Could not delete the book. Please try again.");
  }
}


async function updateBook() {
    const book = {
        oldtitle: document.getElementById("oldtitle").value,
        newtitle: document.getElementById("newtitle").value,
        newauthor: document.getElementById("newauthor").value,
        newgenre: document.getElementById("newgenre").value,
        newprice: document.getElementById("newprice").value,
        newquantity: document.getElementById("newquantity").value
    };

    try{
    const response = await fetch("http://localhost:5000/books", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book)
    });
  

  if (!response.ok) {
      throw new Error("Failed to update book");
    }
        document.getElementById("oldtitle").value = "";
        document.getElementById("newtitle").value = "";
        document.getElementById("newauthor").value = "";
        document.getElementById("newgenre").value = "";
        document.getElementById("newprice").value = "";
        document.getElementById("newquantity").value = "";

  
    getBooks();
  }
  catch (error) {
    console.error("Error updating the book:", error);
    alert("Could not update the book. Please try again.");
  }
}

async function loginUser() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const response = await fetch("http://localhost:5000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();

  if (response.ok) {
    sessionStorage.setItem("userRole", data.role);

    if (data.role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "user.html";
    }
  } else {
    alert(data.error || "Login failed");
  }
}

async function registerUser() {
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;

  const response = await fetch('http://localhost:5000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();

  if (response.ok) {
    alert('Registration successful! You can now log in.');
    document.getElementById('register-username').value = '';
    document.getElementById('register-password').value = '';
  } else {
    alert(data.error || 'Registration failed');
  }
}

function visitorUser() {
 window.location.href = "user.html";
}

  
