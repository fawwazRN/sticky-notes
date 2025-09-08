const judul = document.getElementById("judul");
const warna = document.getElementById("warna");
const isi = document.getElementById("isi-notes");
const file = document.getElementById("file");
const buttonSubmit = document.getElementById("submit");
const kolom = document.getElementById("kolom-data");

//step 2
let notes = JSON.parse(localStorage.getItem("notes")) || [];
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

//bolding
isi.addEventListener("keydown", function(e) {
  if (e.ctrlKey && e.key.toLowerCase() === "b") {
    e.preventDefault(); // cegah browser default (bold semua halaman)

    const start = this.selectionStart;
    const end = this.selectionEnd;
    const text = this.value;

    if (start !== end) {
      // bungkus teks yang dipilih dengan <b></b>
      const before = text.substring(0, start);
      const selected = text.substring(start, end);
      const after = text.substring(end);

      this.value = before + "<b>" + selected + "</b>" + after;
    }
  }
});

//italic
isi.addEventListener("keydown", function(e) {
  if (e.ctrlKey && e.key.toLowerCase() === "i") {
    e.preventDefault(); // cegah browser default (bold semua halaman)

    const start = this.selectionStart;
    const end = this.selectionEnd;
    const text = this.value;

    if (start !== end) {
      // bungkus teks yang dipilih dengan <b></b>
      const before = text.substring(0, start);
      const selected = text.substring(start, end);
      const after = text.substring(end);

      this.value = before + "<i>" + selected + "</i>" + after;
    }
  }
});

//underline
isi.addEventListener("keydown", function(e) {
  if (e.ctrlKey && e.key.toLowerCase() === "u") {
    e.preventDefault(); // cegah browser default (bold semua halaman)

    const start = this.selectionStart;
    const end = this.selectionEnd;
    const text = this.value;

    if (start !== end) {
      // bungkus teks yang dipilih dengan <b></b>
      const before = text.substring(0, start);
      const selected = text.substring(start, end);
      const after = text.substring(end);

      this.value = before + "<u>" + selected + "</u>" + after;
    }
  }
});


function renderNotes() {
  kolom.innerHTML = "";
  notes.forEach((data) => {
    const div = document.createElement("div");
    div.className = "N-kotak";
    div.style.backgroundColor = data.color;

    if (data.color == "black" || "#000000") {
      div.style.color = "white";
    }
    div.innerHTML = `<h2 class="N-judul">${data.judul}</h2>
        <img class='N-gambar' src="${data.image}" alt="">
        <p class="N-isi">${data.isi}</p>
        <div class="double-button">
          <button data-id="${data.id}" class='edit'>edit</button>
          <button data-id="${data.id}" class="remove">remove</button>
        </div>`;
    if (data.image == "") {
      div.querySelector(".N-gambar").remove();
    }

    kolom.appendChild(div);
  });
}

saveNotes();
renderNotes();

//step 3
buttonSubmit.addEventListener("click", () => {
  const newJudul = judul.value.trim();
  const newIsi = isi.value.trim();
  const newFile = file.value.trim();
  const newWarna = warna.value;

  if (newJudul !== "") {
    const newNotes = {
      id: Date.now(),
      color: newWarna,
      judul: newJudul,
      image: newFile,
      isi: newIsi,
    };
    notes.push(newNotes);
    judul.value = "";
    isi.value = "";
    file.value = "";
    saveNotes();
    renderNotes();
  }
});

//step 4
kolom.addEventListener("click", (event) => {
  const target = event.target;

  //edit button
  if (target.classList.contains("edit")) {
    const idEdit = parseInt(target.getAttribute("data-id"));
    const idFind = notes.find((notes) => notes.id === idEdit);
    if (idFind.id == idEdit) {
      judul.value = idFind.judul;
      warna.value = idFind.color;
      isi.value = idFind.isi;
      file.value = idFind.image;
    }
    notes = notes.filter((notes) => notes.id !== idEdit);
    saveNotes();
    renderNotes();
  }

  //remove button
  if (target.classList.contains("remove")) {
    const idRemove = parseInt(target.getAttribute("data-id"));
    notes = notes.filter((notes) => notes.id !== idRemove);
    saveNotes();
    renderNotes();
  }
});
