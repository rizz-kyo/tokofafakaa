const products = [
  { id: 1, name: "Kaos Polos", price: 50000, image: "https://via.placeholder.com/200?text=Kaos" },
  { id: 2, name: "Sepatu Keren", price: 150000, image: "https://via.placeholder.com/200?text=Sepatu" },
  { id: 3, name: "Topi Trendi", price: 75000, image: "https://via.placeholder.com/200?text=Topi" },
  { id: 4, name: "Celana Jeans", price: 120000, image: "https://via.placeholder.com/200?text=Jeans" },
  { id: 5, name: "Jaket Hoodie", price: 180000, image: "https://via.placeholder.com/200?text=Hoodie" },
  { id: 6, name: "Kemeja Lengan Panjang", price: 130000, image: "https://via.placeholder.com/200?text=Kemeja" },
  { id: 7, name: "Tas Ransel", price: 160000, image: "https://via.placeholder.com/200?text=Tas" },
  { id: 8, name: "Jam Tangan", price: 250000, image: "https://via.placeholder.com/200?text=Jam" },
  { id: 9, name: "Kacamata Hitam", price: 85000, image: "https://via.placeholder.com/200?text=Kacamata" },
  { id: 10, name: "Sandal Santai", price: 45000, image: "https://via.placeholder.com/200?text=Sandal" },
  { id: 11, name: "Dompet Kulit", price: 95000, image: "https://via.placeholder.com/200?text=Dompet" },
  { id: 12, name: "Sweater Hangat", price: 110000, image: "https://via.placeholder.com/200?text=Sweater" }
];

const cart = [];

function displayProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  products.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "product";
    div.style.animationDelay = `${index * 0.1}s`; // Animasi berurutan
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Rp${product.price.toLocaleString()}</p>
      <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCartCount();
}

function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}

function toggleCart() {
  const popup = document.getElementById("cart-popup");
  popup.classList.toggle("hidden");

  const itemsList = document.getElementById("cart-items");
  itemsList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - Rp${item.price.toLocaleString()} 
      <span class="remove-btn" onclick="removeFromCart(${index})">❌</span>
    `;
    itemsList.appendChild(li);
    total += item.price;
  });

  document.getElementById("total-price").textContent = `Rp${total.toLocaleString()}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  toggleCart(); // Refresh tampilan
  toggleCart();
}

// Kirim pesanan lewat WhatsApp
document.getElementById('checkout-button').addEventListener('click', function (e) {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  let message = '*🛍️ Pesanan dari Toko Fafackha:*\n\n';
  let total = 0;

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name} - Rp${item.price.toLocaleString()}\n`;
    total += item.price;
  });

  message += `\n💵 *Total: Rp${total.toLocaleString()}*`;

  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = '6283874183246'; // Ganti dengan nomor WA kamu
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(waUrl, '_blank');
});

document.getElementById("cart-btn").addEventListener("click", toggleCart);

// Jalankan saat halaman dimuat
displayProducts();
document.getElementById("review-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const komentar = document.getElementById("komentar").value.trim();
  const rating = document.getElementById("rating").value;

  if (!nama || !komentar) {
    alert("Harap isi semua kolom!");
    return;
  }

  const reviewSection = document.querySelector(".reviews");

  const newReview = document.createElement("div");
  newReview.className = "review";
  newReview.innerHTML = `
    <p>${rating}</p>
    <p>"${komentar}"</p>
    <strong>- ${nama}</strong>
  `;

  reviewSection.appendChild(newReview);

  // Reset form
  document.getElementById("review-form").reset();
});
document.getElementById("review-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const komentar = document.getElementById("komentar").value.trim();
  const rating = document.getElementById("rating").value;

  if (!nama || !komentar) {
    alert("Harap isi semua kolom!");
    return;
  }

  const reviewSection = document.querySelector(".reviews");

  const newReview = document.createElement("div");
  newReview.className = "review";
  newReview.innerHTML = `
    <p class="rating">${rating}</p>
    <p class="komentar">"${komentar}"</p>
    <strong class="nama">- ${nama}</strong>
    <div class="review-actions">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Hapus</button>
    </div>
  `;

  // Tambahkan event listener untuk tombol edit dan hapus
  newReview.querySelector(".edit-btn").addEventListener("click", () => editReview(newReview));
  newReview.querySelector(".delete-btn").addEventListener("click", () => newReview.remove());

  reviewSection.appendChild(newReview);

  // Reset form
  document.getElementById("review-form").reset();
});

function editReview(reviewElement) {
  const nama = reviewElement.querySelector(".nama").textContent.replace("- ", "").trim();
  const komentar = reviewElement.querySelector(".komentar").textContent.replace(/"/g, "").trim();
  const rating = reviewElement.querySelector(".rating").textContent;

  // Isi kembali ke form
  document.getElementById("nama").value = nama;
  document.getElementById("komentar").value = komentar;
  document.getElementById("rating").value = rating;

  // Hapus ulasan lama
  reviewElement.remove();
}
document.getElementById("review-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const komentar = document.getElementById("komentar").value.trim();
  const rating = document.getElementById("rating").value;

  if (!nama || !komentar) {
    alert("Harap isi semua kolom!");
    return;
  }

  const reviewSection = document.querySelector(".reviews");

  const newReview = document.createElement("div");
  newReview.className = "review";
  newReview.innerHTML = `
    <p class="rating">${rating}</p>
    <p class="komentar">"${komentar}"</p>
    <strong class="nama">- ${nama}</strong>
    <div class="review-actions">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Hapus</button>
    </div>
  `;

  // Tambahkan event listener untuk tombol edit dan hapus
  newReview.querySelector(".edit-btn").addEventListener("click", () => editReview(newReview));
  newReview.querySelector(".delete-btn").addEventListener("click", () => newReview.remove());

  reviewSection.appendChild(newReview);

  // Reset form
  document.getElementById("review-form").reset();
});

function editReview(reviewElement) {
  const nama = reviewElement.querySelector(".nama").textContent.replace("- ", "").trim();
  const komentar = reviewElement.querySelector(".komentar").textContent.replace(/"/g, "").trim();
  const rating = reviewElement.querySelector(".rating").textContent;

  document.getElementById("nama").value = nama;
  document.getElementById("komentar").value = komentar;
  document.getElementById("rating").value = rating;

  reviewElement.remove();
}
