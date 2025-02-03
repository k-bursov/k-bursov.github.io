const photoContainer = document.getElementById('photo-container');
const mainPhoto = document.getElementById('main-photo');
const photoLink = document.getElementById('photo-link');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
const dateDisplay = document.getElementById('date-display');
/*const switchIcon1 = document.getElementById('switch-icon-1');
const switchIcon2 = document.getElementById('switch-icon-2');*/
const listSwitch = document.getElementById('list-switch'); // Added list switch container

// Sample photo lists (replace with your actual data)
const photoLists = [
    {
        photos: [ // academic
            { url: "https://i.postimg.cc/524ymdVK/IMG-20191121-164351-362.jpg", link: "https://artesliberales.spbu.ru/ru/education/rezultat-obucheniya/bursov", date: "2019" },
            { url: "https://i.postimg.cc/qv1RbbBJ/graduation.jpg", link: "https://diploma.spbu.ru/gp/view?id=33486", date: "2021" },
            { url: "https://i.postimg.cc/25J5m1Bg/virtualcoglab2023.jpg", link: "https://conf.virtualcoglab.ru/2023/Proceedings/pdf/BursovSlyusarMoscowCogSci2023.pdf", date: "2023" },
            { url: "https://i.postimg.cc/PrkPPvFj/art1.png", link: "https://muse.jhu.edu/article/923075", date: "2023" }
        ]
    },
    {
        photos: [ // personal
            { url: "https://placebear.com/800/600", link: "https://www.example.com/bear1", date: "2023" },
            { url: "https://placebear.com/700/500", link: "https://www.example.com/bear2", date: "2024" },
            { url: "https://placebear.com/600/400", link: "https://www.example.com/bear3", date: "2025" }
        ]
    }
];

let currentListIndex = 0;
let currentPhotoIndex = photoLists[0].photos.length - 1;
let isIcon1Visible = true; // Track which icon is visible

function updatePhoto() {
    const currentList = photoLists[currentListIndex];
    const currentPhoto = currentList.photos[currentPhotoIndex];
    mainPhoto.src = currentPhoto.url;
    photoLink.href = currentPhoto.link;
    dateDisplay.textContent = currentPhoto.date;

    // Hide arrows if at the end of the list
    leftArrow.classList.toggle('hidden', currentPhotoIndex === 0);
    rightArrow.classList.toggle('hidden', currentPhotoIndex === currentList.photos.length - 1);
}

// Add an event listener for the 'change' event
listSwitch.addEventListener('change', function() {
    if (this.checked) {
      // Switch to the next list when switch is ON
      currentListIndex = (currentListIndex + 1) % photoLists.length;
      currentPhotoIndex = photoLists[0].photos.length - 1; // reset to the first image of a list, not to the last
      updatePhoto();

    } else {
      // Switch to the previous list when switch is OFF
      currentListIndex = (currentListIndex - 1 + photoLists.length) % photoLists.length;
      currentPhotoIndex = photoLists[0].photos.length - 1; //reset to the first image of a list, not to the last
      updatePhoto();
    }
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
rightArrow.addEventListener('click', () => navigatePhoto('right'));
listSwitch.addEventListener('click', () => {
    switchList();
    toggleSwitchIcon();
});

// Initial setup
updatePhoto();
