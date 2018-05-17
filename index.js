const app = {

    init(selectors) {
        this.max = 0;
        this.songArray = [];
        this.songList = document.querySelector(selectors.listSelector);
        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', (ev) => {
                ev.preventDefault();
                this.addMusicToList(ev);
            });
    },

    addMusicToList(ev) {
        ev.preventDefault();
        const form = ev.target;

        const listItem = this.buildListItem(ev);
        this.songList.insertBefore(listItem, this.songList.firstChild);
        form.reset();
    },

    buildListItem(ev) {
        const form = ev.target;
        const song = {
            id: ++this.max,
            name: form.musicName.value,
        }
        this.songArray.push(song);
        const listItem = document.createElement('li');
        listItem.dataset.id = song.id;
        listItem.dataset.name = song.name;
        listItem.textContent = song.name;
        const deleteButton = document.createElement('button');
        const buttonText = document.createTextNode('Delete');
        deleteButton.type = 'button';
        deleteButton.style.display = 'inline-block';
        deleteButton.addEventListener('click', (deleteEv) => {
            this.deleteListItem(deleteEv);
        });
        deleteButton.appendChild(buttonText);
        listItem.appendChild(deleteButton);
        return listItem;
    },

    deleteListItem(ev) {
        const listItem = ev.target.parentElement;
        const songIndex = this.songArray.indexOf(listItem.dataset.name);
        if (songIndex >= 0) {
            this.songArray.splice(songIndex, 1);
        }
        this.songList.removeChild(listItem);
    },
}

app.init({
    formSelector: '#musicForm',
    listSelector: '#musicList',
});