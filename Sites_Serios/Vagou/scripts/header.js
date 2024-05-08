let headerImage = document.getElementById('header-image')


function updateImageSource() {
    if (window.innerWidth <= 1600) {
        headerImage.src='./assets/header-resp.png'
        headerImage.width='150'
    } else {
        headerImage.src='./assets/header.png'
        headerImage.width='300'
    }
}

updateImageSource()

window.addEventListener('resize', updateImageSource)