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
            { url: "https://i.postimg.cc/fy7cp792/art2.png", link: "https://doi.org/10.1080/0163853X.2025.2478800", date: "2025" },
            { url: "https://i.postimg.cc/Fzsc8fhW/230-BAE68-1-FA4-400-B-A64-B-184078-B605-C9-1-105-c.jpg", link: "https://easychair.org/smart-program/STD2025/2025-07-10.html#talk:281530", date: "2025" }
        ]
    },
    {
        photos: [ // personal
            { url: "https://i.postimg.cc/x15wLBfR/Beyond.jpg", link: "https://links.freshtunes.com/UlrRp", date: "2016" },
            { url: "https://i.postimg.cc/zvWmWBvb/Cover.jpg", link: "https://links.freshtunes.com/ud03w", date: "2021" }
        ]
    }
];

let currentListIndex = 0;
let currentPhotoIndex = photoLists[0].photos.length - 1;
let isIcon1Visible = true; // Track which icon is visible

// Create and append loading overlay with spinner
const loadingOverlay = document.createElement('div');
loadingOverlay.id = 'loading-overlay';
loadingOverlay.style.position = 'absolute';
loadingOverlay.style.top = '0';
loadingOverlay.style.left = '0';
loadingOverlay.style.width = '100%';
loadingOverlay.style.height = '100%';
loadingOverlay.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
loadingOverlay.style.display = 'flex';
loadingOverlay.style.alignItems = 'center';
loadingOverlay.style.justifyContent = 'center';
loadingOverlay.style.zIndex = '10';
loadingOverlay.style.display = 'none'; // hidden by default

// Create spinner element matching your CSS spinner style
const spinner = document.createElement('div');
spinner.style.width = '40px';
spinner.style.height = '40px';
spinner.style.borderRadius = '50%';
spinner.style.border = '2px solid #ccc';
spinner.style.borderTopColor = '#6e7478'; // Primary color for spinner
spinner.style.animation = 'spin 1s linear infinite';

// Append spinner to loading overlay
loadingOverlay.appendChild(spinner);

// Ensure photoContainer is positioned relatively for overlay positioning
photoContainer.style.position = 'relative';
photoContainer.appendChild(loadingOverlay);

function updatePhoto() {
    const currentList = photoLists[currentListIndex];
    const currentPhoto = currentList.photos[currentPhotoIndex];

    loadingOverlay.style.display = 'flex'; // Show loading overlay
    mainPhoto.classList.add('loading'); // loading css
	
	const img = new Image();
	  img.onload = () => {
		mainPhoto.src = currentPhoto.url;  // set the real image
		mainPhoto.classList.remove('loading'); // remove the loading class
		photoLink.href = currentPhoto.link;
		dateDisplay.textContent = currentPhoto.date;
        	loadingOverlay.style.display = 'none'; // Hide loading overlay after load
	  };
    	img.onerror = () => {
     		// Hide loading overlay on error and optionally handle error display
        	loadingOverlay.style.display = 'none';
        	mainPhoto.classList.remove('loading');
    	}
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
