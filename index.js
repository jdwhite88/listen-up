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
            this.renameListItem(renameEv);
        });
        const deleteButton = listItem.querySelector('.button.delete');
        deleteButton.addEventListener('click', (deleteEv) => {
            this.modifyListItem(this.deleteListItem, deleteEv);
        });
        const favButton = listItem.querySelector('.button.favorite');
        favButton.addEventListener('click', (favEv) => {
            this.modifyListItem(this.favListItem, favEv);
        });

        const upButton = listItem.querySelector('.button.up');
        upButton.addEventListener('click', (upEv) => {
            this.modifyListItem(this.moveListItemUp, upEv);
        });
        const downButton = listItem.querySelector('.button.down');
        downButton.addEventListener('click', (downEv) => {
            this.modifyListItem(this.moveListItemDown, downEv);
        });


        return listItem;
    },

    //Find index of listItem in songArray by comparing unique id
    indexOfListItem(listItem) {
        for (let i = 0; i < this.songArray.length; i++) {
            if (this.songArray[i].id === parseInt(listItem.dataset.id)) {
                return i;
            }
        }
        return -1;
    },

    // Perform function on list item (ev: button < span < li)
    modifyListItem(itemFunction, ev) {
        const listItem = ev.target.parentElement.parentElement;
        const listItemIndex = this.indexOfListItem(listItem);
        if (listItemIndex != -1) {
            itemFunction(listItem, listItemIndex);
        }
    },

    // Once user edits, rename the listed name of the song (ev: span < li)
    renameListItem(ev) {
        const listItem = ev.target.parentElement;
        const listItemIndex = this.indexOfListItem(listItem);
        if (listItemIndex != -1) {
            app.songArray[listItemIndex].name = listItem.querySelector('.musicName').textContent;
        }
    },

    // Delete the unique list item from the array if not favorited, 
    // and remove from the page
    deleteListItem(listItem, listItemIndex) {
        if (!listItem.fav) {
            app.songArray.splice(listItemIndex, 1);
            app.songList.removeChild(listItem);
        }
    },

    // Toggle favorite property for list item
    favListItem(listItem) {
        listItem.fav = !listItem.fav;
        listItem.querySelector('.button.delete').disabled = (listItem.fav) ? true : false;
        listItem.style.backgroundColor = (listItem.fav) ? 'paleGreen' : 'transparent';
        listItem.style.color = (listItem.fav) ? 'rgb(16, 77, 108)' : 'rgb(21, 190, 246)';
    },

    // Swap list item with the one above it (bottom is first element)
    moveListItemDown(listItem, listItemIndex) {
        if (listItemIndex > 0) {
            const list = app.songList.children;
            const indexBefore = (list.length-1) - listItemIndex;
            const itemBelow = list[indexBefore];
            app.songList.insertBefore(itemBelow, listItem);

            const temp = app.songArray[listItemIndex - 1];
            app.songArray[listItemIndex - 1] = app.songArray[listItemIndex];
            app.songArray[listItemIndex] = temp;
        }
    },

    // Swap list item with the one below it (top is last element)
    moveListItemUp(listItem, listItemIndex) {
        if (listItemIndex < app.songArray.length - 1) {
            const list = app.songList.children;
            const indexAfter = (list.length-1) - listItemIndex - 2;
            const itemAbove = app.songList.children[indexAfter];
            app.songList.insertBefore(listItem, itemAbove);
            
            const temp = app.songArray[listItemIndex + 1];
            app.songArray[listItemIndex + 1] = app.songArray[listItemIndex];
            app.songArray[listItemIndex] = temp;
        }
    },
}

app.init({
    formSelector: '#musicForm',
    listSelector: '#musicList',
    templateSelector: '.music.template',
});