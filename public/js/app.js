const uploadBtn = document.getElementById('uploadBtn');
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const uploadError = document.getElementById('uploadError');
const uploadSuccess = document.getElementById('uploadSuccess');

// selecting the upload file
imageInput.addEventListener('change', (e) => {
  // getting the file which was selected
  const image = e.target.files[0];
  //
  if (image) {
    if (
      image.type !== 'image/jpg' &&
      image.type !== 'image/jpeg' &&
      image.type !== 'image/png'
    ) {
      uploadError.textContent =
        'image file type should be either jpg,png or jpeg';
      return;
    }
    // creating url to preview image
    const imageUrl = URL.createObjectURL(image);
    // previewing the image
    imagePreview.src = imageUrl;
  }
});

uploadBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (imageInput.files.length === 0) {
    alert('please select an image');
    return;
  }

  if (!imageInput.files || imagePreview.src === '') {
    alert('please select an image');
    return;
  }
  const image = imageInput.files[0];
  console.log(image);
  // creating a from data
  const formData = new FormData();

  formData.append('image', image);

  fetch('/upload', {
    method: 'post',
    body: formData,
  })
    .then(async (response) => {
      //console.log(await response.json());
      const reply = await response.json();
      console.log(reply, 'repy');
      if (reply.status === 200) {
        imageInput.value = null;
        imagePreview.src = '';

        uploadSuccess.textContent = reply.message;
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
