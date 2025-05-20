document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('fileInput');
    const previewImage = document.getElementById('previewImage');

    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.setAttribute('src', e.target.result);
            previewImage.style.display = 'block';
        };
        reader.readAsDataURL(file);
    });
});
