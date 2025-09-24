// =========================
// SAVE & LOAD BIOGRAPHY
// =========================
function saveBio() {
  const bio = document.getElementById("bioText").value;
  localStorage.setItem("myBio", bio);
  document.getElementById("savedBio").innerText = bio;
}

// Load saved bio on page load
if (document.getElementById("savedBio")) {
  const savedBio = localStorage.getItem("myBio");
  if (savedBio) {
    document.getElementById("savedBio").innerText = savedBio;
    document.getElementById("bioText").value = savedBio;
  }
}

// =========================
// IMAGE UPLOADS WITH CLOUDINARY
// =========================
const cloudName = "YOUR_CLOUD_NAME";         // replace with your Cloudinary cloud name
const unsignedUploadPreset = "YOUR_PRESET";  // replace with your upload preset

async function uploadImages() {
  const files = document.getElementById("imageUpload").files;
  if (!files.length) {
    alert("Please select images first.");
    return;
  }

  for (let file of files) {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", unsignedUploadPreset);

    let res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: "POST",
      body: formData
    });

    let data = await res.json();

    // Add uploaded image to gallery
    let img = document.createElement("img");
    img.src = data.secure_url;
    document.getElementById("gallery").appendChild(img);

    // Save image URLs locally
    let urls = JSON.parse(localStorage.getItem("myImages") || "[]");
    urls.push(data.secure_url);
    localStorage.setItem("myImages", JSON.stringify(urls));
  }
}

// Load saved gallery on page load
if (document.getElementById("gallery")) {
  let urls = JSON.parse(localStorage.getItem("myImages") || "[]");
  urls.forEach(url => {
    let img = document.createElement("img");
    img.src = url;
    document.getElementById("gallery").appendChild(img);
  });
}

// =========================
// DESIGN CUSTOMIZATION
// =========================
function changeBg() {
  let color = document.getElementById("bgColorPicker").value;
  document.body.style.backgroundColor = color;
  localStorage.setItem("bgColor", color);
}

function changeTextColor() {
  let color = document.getElementById("textColorPicker").value;
  document.body.style.color = color;
  localStorage.setItem("textColor", color);
}

// Load saved design preferences
window.onload = () => {
  if (localStorage.getItem("bgColor")) {
    document.body.style.backgroundColor = localStorage.getItem("bgColor");
  }
  if (localStorage.getItem("textColor")) {
    document.body.style.color = localStorage.getItem("textColor");
  }
};
