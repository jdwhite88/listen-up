const addButton = document.querySelector('button.newMusic');
const form = document.querySelector('form.newMusic');
const songList = document.querySelector('#musicList');
const songArray = [];

// Add to both internal list (array) and external list (<ul>)
const addMusicToList = function(ev) {
    ev.preventDefault();
    songList.appendChild(buildListItem());
    form.reset();
}

function buildListItem() {
    const song = form.musicTitle.value;
    songArray.push(song);
    const listItem = document.createElement('li');
    listItem.id = song;
    listItem.textContent = song;
    const deleteButton = document.createElement('button');
    const buttonText = document.createTextNode("Delete");
    deleteButton.type = 'button';
    deleteButton.style.display = 'inline-block';
    deleteButton.addEventListener('click', deleteListItem);
    deleteButton.appendChild(buttonText);
    listItem.appendChild(deleteButton);
    return listItem;
}

form.addEventListener('submit', addMusicToList);

function deleteListItem(ev) {
    const listItem = ev.target.parentElement;
    const songIndex = songArray.indexOf(listItem.id);
    if (songIndex >= 0) {
        songArray.splice(songIndex, 1);
    }
    songList.removeChild(listItem);
}