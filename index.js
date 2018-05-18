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

        const listItem = this.template.cloneNode(true);
        listItem.classList.remove('template');
        listItem.dataset.id = song.id;
        listItem.dataset.name = song.name;
        listItem.dataset.fav = false;

        const listItemName = listItem.querySelector('.musicName');
        listItemName.textContent = song.name;
        listItemName.addEventListener('input', (renameEv) => {
            this.modifyListItem(this.renameListItem, renameEv);
        });
        const deleteButton = listItem.querySelector('.button.delete');
        deleteButton.addEventListener('click', (deleteEv) => {
            this.modifyListItem(this.deleteListItem, deleteEv);
        });
        const favButton = listItem.querySelector('.button.favorite');
        favButton.addEventListener('click', (favEv) => {
            this.modifyListItem(this.favListItem, favEv);
        });


        return listItem;
    },

    //Find index of listItem in songArray
    indexOfListItem(listItem) {
        for (let i = 0; i < this.songArray.length; i++) {
            if (this.songArray[i].id === parseInt(listItem.dataset.id)) {
                return i;
            }
        }
        return -1;
    },

    // Perform function on list item
    modifyListItem(itemFunction, ev) {
        const listItem = ev.target.parentElement;
        const listItemIndex = this.indexOfListItem(listItem);
        if (listItemIndex != -1) {
            itemFunction(listItem, listItemIndex);
        }
    },

    // Once user edits, rename the listed name of the song
    renameListItem(listItem, listItemIndex) {
        app.songArray[listItemIndex].name = listItem.querySelector('.musicName').textContent;
    },

    // Delete the unique list item from the array, and remove from the page
    deleteListItem(listItem, listItemIndex) {
        app.songArray.splice(listItemIndex, 1);
        app.songList.removeChild(listItem);
    },

    // Toggle favorite property for list item
    favListItem(listItem) {
        listItem.fav = !listItem.fav;
        listItem.style.backgroundColor = (listItem.fav) ? 'lemonchiffon' : 'transparent';
    },   
}

app.init({
    formSelector: '#musicForm',
    listSelector: '#musicList',
    templateSelector: '.music.template',
});