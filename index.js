const app = {

    init(selectors) {
        this.max = 0;
        this.songArray = [];
        this.songList = document.querySelector(selectors.listSelector);
        this.template = document.querySelector(selectors.templateSelector);

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
        //const listItem = document.createElement('li');
        const listItem = this.template.cloneNode(true);
        listItem.classList.remove('template');
        listItem.dataset.id = song.id;
        listItem.dataset.name = song.name;
        listItem
            .querySelector('.musicName')
            .textContent = song.name;

        const deleteButton = listItem.querySelector('.button.alert');
        deleteButton.addEventListener('click', (deleteEv) => {
            this.deleteListItem(deleteEv);
        });
        return listItem;
    },

    //Delete every instance from the array, and remove from the page
    deleteListItem(ev) {
        const listItem = ev.target.parentElement.parentElement;
        // const songIndex = this.songArray.indexOf(listItem.dataset.name);
        // if (songIndex >= 0) {
        //     this.songArray.splice(songIndex, 1);
        // }
        for (let i = 0; i < this.songArray.length; i++) {
            if (this.songArray[i].name === listItem.dataset.name 
                && this.songArray[i].id === parseInt(listItem.dataset.id)) {
                this.songArray.splice(i, 1);
                break;
            }
        }
        this.songList.removeChild(listItem);
    },
}

app.init({
    formSelector: '#musicForm',
    listSelector: '#musicList',
    templateSelector: '.music.template',
});