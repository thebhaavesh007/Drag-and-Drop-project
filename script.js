const dropZone = document.getElementById('drop-zone');
const browseBtn = document.getElementById('browse-btn');
const imageInput = document.getElementById('image-input');
const previewImg = document.getElementById('preview-img');
const saveBtn = document.getElementById('save-btn');
const descriptionInput = document.getElementById('image-description');
const uploadsDiv = document.getElementById('uploads');

let currentImage = null;

// Allow drag & drop
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');

    const file = e.dataTransfer.files[0];

    if (file.type !== 'image/jpeg') {
        alert('Only JPG images are allowed!');
        return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
        previewImg.src = event.target.result;
        previewImg.style.display = 'block';
        currentImage = file;
    };

    reader.readAsDataURL(file);
});

// Browse button click
browseBtn.addEventListener('click', () => {
    imageInput.click();
});

// Input change
imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];

    if (file.type !== 'image/jpeg') {
        alert('Only JPG images are allowed!');
        return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
        previewImg.src = event.target.result;
        previewImg.style.display = 'block';
        currentImage = file;
    };

    reader.readAsDataURL(file);
});

// Save button click
saveBtn.addEventListener('click', () => {
    if (!currentImage) {
        alert('No image selected!');
        return;
    }

    const description = descriptionInput.value.trim();

    if (!description) {
        alert('Please enter a description!');
        return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
        const uploadedItem = document.createElement('div');
        uploadedItem.classList.add('uploaded-item');

        const uploadedImg = document.createElement('img');
        uploadedImg.src = event.target.result;
        uploadedImg.alt = 'Uploaded Image';

        const uploadedDesc = document.createElement('p');
        uploadedDesc.textContent = description;

        uploadedItem.appendChild(uploadedImg);
        uploadedItem.appendChild(uploadedDesc);
        uploadsDiv.appendChild(uploadedItem);

        // Reset inputs
        previewImg.src = '';
        previewImg.style.display = 'none';
        descriptionInput.value = '';
        currentImage = null;
        imageInput.value = '';
    };

    reader.readAsDataURL(currentImage);
});
