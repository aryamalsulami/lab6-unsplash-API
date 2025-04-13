const client_id = "_HkGdoq0yTCu4rj5aMN4Gj2Sl2xypl4BRcCc1G48ERo"; // Replace with your actual Unsplash API key

function displayImages(images) {
  const container = document.getElementById("imagesContainer");
  container.innerHTML = "";
  images.forEach(photo => {
    const img = document.createElement("img");
    img.src = photo.urls.small;
    img.alt = photo.alt_description || "Unsplash image";
    container.appendChild(img);
  });
}

function searchUsingXHR() {
  const keyword = document.getElementById("searchInput").value;
  const xhr = new XMLHttpRequest();
  const url = `https://api.unsplash.com/search/photos?client_id=${client_id}&per_page=8&query=${encodeURIComponent(keyword)}`;

  xhr.open("GET", url);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      displayImages(response.results);
    }
  };
  xhr.send();
}

function searchUsingFetch() {
  const keyword = document.getElementById("searchInput").value;
  const url = `https://api.unsplash.com/search/photos?client_id=${client_id}&per_page=8&query=${encodeURIComponent(keyword)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => displayImages(data.results));
}

async function searchUsingAsync() {
  const keyword = document.getElementById("searchInput").value;
  const url = `https://api.unsplash.com/search/photos?client_id=${client_id}&per_page=8&query=${encodeURIComponent(keyword)}`;

  const response = await fetch(url);
  const data = await response.json();
  displayImages(data.results);
}

window.onload = searchUsingAsync; // Initial search on load