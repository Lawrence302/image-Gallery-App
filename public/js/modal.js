const modalContainer = document.getElementsByClassName('modal-container')[0];
const modal = document.getElementsByClassName('modal')[0];
const imageDisplay = document.getElementById('image-show');
const body = document.body;

const images = document.getElementsByClassName('photo');
const imagesArray = Array.from(images);
modalContainer.addEventListener('click', (e) => {
  modalContainer.classList.add('hide');
  body.classList.remove('modal-open');
});

modal.addEventListener('click', (e) => {
  e.stopPropagation();
});

imagesArray.forEach((image) => {
  image.addEventListener('click', () => {
    // Save the current scroll position
    const scrollPosition = window.scrollY;

    // Set the modal's position based on the scroll position
    modalContainer.style.top = `${scrollPosition}px`;
    console.log(scrollPosition);
    modalContainer.style.bottom = `${-scrollPosition}px`;

    // inserting the image in the modal
    imageDisplay.src = image.src;
    // show the modal by removing the hide class
    modalContainer.classList.remove('hide');
    body.classList.add('modal-open');
    // modalContainer.classList.add('show')
  });
});
