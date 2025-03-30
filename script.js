const photoContainer = document.getElementById('photo-container');
const mainPhoto = document.getElementById('main-photo');
const photoLink = document.getElementById('photo-link');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
const dateDisplay = document.getElementById('date-display');
const page = document.getElementsByTagName('html')[0];
const listSwitch = document.getElementById('list-switch'); // Added list switch container

const photoLists = [
    {
        photos: [ // academic
            { url: "https://i.postimg.cc/zXS3WD9R/AOLk-r-IGbf-M.jpg", link: "", date: "2015/2019" },
            { url: "https://i.postimg.cc/524ymdVK/IMG-20191121-164351-362.jpg", link: "https://artesliberales.spbu.ru/ru/education/rezultat-obucheniya/bursov", date: "2019" },
            { url: "https://i.postimg.cc/qv1RbbBJ/graduation.jpg", link: "https://diploma.spbu.ru/gp/view?id=33486", date: "2021" },
            { url: "https://i.postimg.cc/DZCmy7xx/IMG-20220921-160704.jpg", link: "https://ihb.spb.ru/science/divisions/cognitive-psychology-and-psychophysiology", date: "2022" },
            { url: "https://i.postimg.cc/4ymyYjMs/IMG-20230622-111301.jpg", link: "https://conf.virtualcoglab.ru/2023/Proceedings/pdf/BursovSlyusarMoscowCogSci2023.pdf", date: "2023" },
            { url: "https://i.postimg.cc/PrkPPvFj/art1.png", link: "https://muse.jhu.edu/article/923075", date: "2023" },
            { url: "https://i.postimg.cc/fy7cp792/art2.png", link: "https://doi.org/10.1080/0163853X.2025.2478800", date: "2025" }
        ]
    },
    {
        photos: [ // personal
            { url: "https://i.postimg.cc/x15wLBfR/Beyond.jpg", link: "", date: "2016" },
            { url: "https://i.postimg.cc/zvWmWBvb/Cover.jpg", link: "https://links.freshtunes.com/ud03w", date: "2021" }
        ]
    }
];

let currentListIndex = 0;
let currentPhotoIndex = photoLists[0].photos.length - 1;
let isIcon1Visible = true; // Track which icon is visible

function updatePhoto() {
    const currentList = photoLists[currentListIndex];
    const currentPhoto = currentList.photos[currentPhotoIndex];
    mainPhoto.classList.add('loading'); // loading css
	
	const img = new Image();
	  img.onload = () => {
		mainPhoto.src = currentPhoto.url;  // set the real image
		mainPhoto.classList.remove('loading'); // remove the loading class
		photoLink.href = currentPhoto.link;
		dateDisplay.textContent = currentPhoto.date;
	  };
	img.src = currentPhoto.url; // Start loading the actual image	

    // Hide arrows if at the end of the list
    leftArrow.classList.toggle('hidden', currentPhotoIndex === 0);
    rightArrow.classList.toggle('hidden', currentPhotoIndex === currentList.photos.length - 1);
}


listSwitch.addEventListener('change', function() {
    if (this.checked) {
      // Switch to the next list when switch is ON
      currentListIndex = (currentListIndex + 1) % photoLists.length;
      currentPhotoIndex = photoLists[currentListIndex].photos.length - 1;

    } else {
      // Switch to the previous list when switch is OFF
      currentListIndex = (currentListIndex - 1 + photoLists.length) % photoLists.length;
      currentPhotoIndex = photoLists[currentListIndex].photos.length - 1;
    }
	updatePhoto();
});


function navigatePhoto(direction) {
    const currentList = photoLists[currentListIndex];
    if (direction === 'left' && currentPhotoIndex > 0) {
        currentPhotoIndex--;
    } else if (direction === 'right' && currentPhotoIndex < currentList.photos.length - 1) {
        currentPhotoIndex++;
    }
    updatePhoto();
}

function toggleSwitchIcon() {
    if (isIcon1Visible) {
        switchIcon1.classList.add('hidden');
        switchIcon2.classList.remove('hidden');
    } else {
        switchIcon1.classList.remove('hidden');
        switchIcon2.classList.add('hidden');
    }
    isIcon1Visible = !isIcon1Visible;
}

// Event listeners
leftArrow.addEventListener('click', () => navigatePhoto('left'));
window.addEventListener('keydown', event => {
  if (event.key == "ArrowLeft") {
    navigatePhoto('left');
  } else if (event.key == "ArrowRight") {
    navigatePhoto('right');
  }
})
rightArrow.addEventListener('click', () => navigatePhoto('right'));
listSwitch.addEventListener('click', () => {
    switchList();
    toggleSwitchIcon();
});

// Swipes
page.addEventListener('touchstart', function (event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

page.addEventListener('touchend', function (event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
}, false);


function handleGesture() {
    if (touchendX < touchstartX && touchstartX/touchendX > 1.25) {
		console.log('Swiped Right');
		navigatePhoto('right');
    }

    if (touchendX > touchstartX && touchendX/touchstartX > 1.25) {
		console.log('Swiped Left');
		navigatePhoto('left');
    }

    if (touchendY < touchstartY) {
        console.log('Swiped Up');
    }

    if (touchendY > touchstartY) {
        console.log('Swiped Down');
    }

    if (touchendY === touchstartY) {
        console.log('Tap');
    }
}


// Initial setup
updatePhoto();
