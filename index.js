const addButton = document.querySelector('button.newMusic');
const form = document.querySelector('form.newMusic');
const songArray = [];
const addMusicToList = function(ev) {
    ev.preventDefault();

    const song = form.musicTitle.value;
    songArray.push(song);
    form.reset();
}

form.addEventListener('submit', addMusicToList);