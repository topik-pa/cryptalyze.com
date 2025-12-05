export const home = {
  init: async () => {
    console.log('Home page')

    const dropArea = document.getElementById("dropArea");
    const fileInput = document.getElementById("fileInput");
    const fileName = document.getElementById("fileName");
    const submitBtn = document.getElementById("submitBtn");

    // Click per aprire file picker
    dropArea.addEventListener("click", () => fileInput.click());

    // File selezionato via click
    fileInput.addEventListener("change", () => {
      updateFileName(fileInput.files[0]);
    });

    // Drag over → serve per permettere il drop
    dropArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropArea.classList.add("dragover");
    });

    // Drag leave → ritorna allo stato normale
    dropArea.addEventListener("dragleave", () => {
      dropArea.classList.remove("dragover");
    });

    // Drop del file
    dropArea.addEventListener("drop", (e) => {
      e.preventDefault();
      dropArea.classList.remove("dragover");

      const file = e.dataTransfer.files[0];
      fileInput.files = e.dataTransfer.files; // collega al file input

      updateFileName(file);
    });

    function updateFileName(file) {
      if (file) {
        fileName.textContent = "Selected file: " + file.name;
        submitBtn.classList.remove('disabled')
      }
    }
  }
}
