const fullImage = document.querySelector('.full-img');

const displayedImage = document.querySelector('.displayed-img');

const overlay = document.querySelector('.overlay');

const btn = document.querySelector('button')

const thumbBar = document.querySelector('.thumb-bar');

// Looping through all the images 

for(let i = 1 ; i <= 5 ; i++) {
    let image = document.createElement("img");
    image.setAttribute('src','images/pic' + i + '.jpg');
    thumbBar.appendChild(image);
    image.addEventListener('click', function(e) {
        displayedImage.src = e.target.src;
    })
}

//darken
btn.addEventListener('click', function(){
    const btnClass = btn.getAttribute('class');

    if(btnClass === 'dark') {
        btn.setAttribute('class', 'light')
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgb(0,0,0,0.6)';
    } else {
        btn.setAttribute('class', 'dark')
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgb(0,0,0,0)';
    }
});

