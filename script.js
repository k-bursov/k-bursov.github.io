const photoContainer = document.getElementById('photo-container');
const mainPhoto = document.getElementById('main-photo');
const photoLink = document.getElementById('photo-link');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
const dateDisplay = document.getElementById('date-display');
const switchIcon1 = document.getElementById('switch-icon-1');
const switchIcon2 = document.getElementById('switch-icon-2');
const listSwitch = document.getElementById('list-switch'); // Added list switch container

// Sample photo lists (replace with your actual data)
const photoLists = [
    {
        photos: [
            { url: "https://sun9-66.userapi.com/impg/Jj8V7fNEK2O0zA7OW0BVs0BnBj1wBPxZCl8n0g/kh5JXSoi6kI.jpg?size=613x480&quality=95&sign=bbec4a47b59c6eaa39789bf7624394b9&type=album", link: "https://www.example.com/kitten1", date: "2023" },
            { url: "https://sun9-22.userapi.com/impg/M7WPFge5jZ08kBThx8Un6reFTe7rHeD8-qvtQg/-IJ0GNDtd3I.jpg?size=2560x2560&quality=95&sign=96dbe468eb791d7238c475807df30500&type=album", link: "https://www.example.com/kitten2", date: "2024" },
            { url: "https://sun9-41.userapi.com/impg/YN3RkTMtSj4wRuEFLOCqb-0nIRAZrNF9Vy_8hQ/lwuKm1jCQQ0.jpg?size=640x640&quality=95&sign=7ca8371417f3a8ea20e008a359261de5&type=album", link: "https://www.example.com/kitten3", date: "2025" }
        ]
    },
    {
        date: "2023-11-15",
        photos: [
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

function switchList() {
    currentListIndex = (currentListIndex + 1) % photoLists.length;
    currentPhotoIndex = photoLists[0].photos.length - 1; // Reset photo index when switching lists
    updatePhoto();
}

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
