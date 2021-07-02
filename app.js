const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const gallery = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const lightboxImage = lightbox.querySelector('.lightbox__image');
const lightboxOverlay = lightbox.querySelector('.lightbox__overlay');
const modalClsBtn = lightbox.querySelector(
  'button[data-action="close-lightbox"]'
);

gallery.addEventListener('click', getOriginalImgData);
modalClsBtn.addEventListener('click', modalClose);

// window.addEventListener('keydown', modalKeyInterface);

gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(galleryItems));
const itemsArray = gallery.querySelectorAll('.gallery__image');

function createGalleryMarkup(arrayItems) {
  return arrayItems
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src='${preview}'
      data-source="${original}"
      alt='${description}'
    />
  </a>
</li>`;
    })
    .join('');
}

function modalOpen(event) {
  lightbox.classList.add('is-open');

  lightboxOverlay.addEventListener('click', modalClose);

  window.addEventListener('keydown', modalClose);
  window.addEventListener('keydown', modalKeyInterface);
}

function modalClose(event) {
  if (event.code !== 'Escape' && event.target !== event.currentTarget) {
    return;
  }

  lightbox.classList.remove('is-open');
  lightboxOverlay.removeEventListener('click', modalClose);
  window.removeEventListener('keydown', modalClose);
  window.removeEventListener('keydown', modalKeyInterface);

  lightboxImage.setAttribute('src', '');
  lightboxImage.setAttribute('alt', '');
}

function changeLightboxImage(src, alt) {
  lightboxImage.setAttribute('src', src);
  lightboxImage.setAttribute('alt', alt);
}

function getOriginalImgData(event) {
  event.preventDefault();

  if (event.target === event.currentTarget) {
    return;
  }

  const src = event.target.dataset.source;
  const alt = event.target.getAttribute('alt');

  modalOpen(event);
  changeLightboxImage(src, alt);
}

function modalKeyInterface(event) {
  const imgArray = [];

  [...itemsArray].forEach(element => {
    imgArray.push(element.dataset.source);
  });

  const currentSrc = lightboxImage.getAttribute('src');
  let index = imgArray.indexOf(currentSrc);

  if (event.code === 'ArrowRight') {
    if (index >= itemsArray.length - 1) {
      index = -1;
    }
    index += 1;
  }

  if (event.code === 'ArrowLeft') {
    if (index <= 0) {
      index = itemsArray.length;
    }
    console.log(index);
    index -= 1;
  }

  const src = itemsArray[index].dataset.source;
  const alt = itemsArray[index].getAttribute('alt');
  changeLightboxImage(src, alt);
}
