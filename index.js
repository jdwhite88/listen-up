const addButton = document.querySelector('button.newMusic');
const form = document.querySelector('form.newMusic');
const songList = document.querySelector('#musicList');
const songArray = [];

// Add to both internal list (array) and external list (<ul>)
const addMusicToList = function(ev) {
    ev.preventDefault();
    const song = form.musicTitle.value;
    songArray.push(song);
    songList.appendChild(buildListItem());
    form.reset();
}

function buildListItem() {
    const song = form.musicTitle.value;
    songArray.push(song);
    const listItem = document.createElement('li');
    listItem.textContent = song;
    return listItem;
}

form.addEventListener('submit', addMusicToList);