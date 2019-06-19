import storage from '../common/localStorage'

const appKey = 'blue_notebook'

const historyPrefix = `${appKey}_history`
const contentPrefix = `${appKey}_detail`

const listKey = `${appKey}_list`

class DataManager {
  _getNoteKey (title) {
    return `${contentPrefix}_${encodeURIComponent(title)}`
  }
  _setNoteList (noteList) {
    return storage.setItem(listKey, noteList)
  }
  _removeNoteListItem (noteKey) {
    const noteList = this.getNoteList()
    const noteIndex = noteList.findIndex((note) => note.noteKey === noteKey)
    if (noteIndex === -1) {
      return false
    }
    noteList.splice(noteIndex, 1)
    return this._setNoteList(noteList)
  }
  _addNoteListItem (noteKey, title, modifyTime) {
    const noteList = this.getNoteList()
    const newNoteListItem = {
      noteKey,
      title,
      modifyTime
    }
    noteList.unshift(newNoteListItem)
    return this._setNoteList(noteList)
  }
  _editNoteListItem (noteKey, title, modifyTime) {
    const noteList = this.getNoteList()
    const noteIndex = noteList.findIndex((note) => note.noteKey === noteKey)
    if (noteIndex === -1) {
      return false
    }
    const newNoteListItem = {
      noteKey,
      title,
      modifyTime
    }
    noteList[noteIndex] = newNoteListItem
    return this._setNoteList(noteList)
  }

  getNoteList () {
    let result = storage.getItem(listKey)
    if (!result) {
      return storage.setItem(listKey, [])
    }
    return result
  }

  getNoteDetail (title) {
    const noteKey = this._getNoteKey(title)
    return storage.getItem(noteKey)
  }

  newNote (title, content) {
    if (!title) {
      console.error('title can not be empty')
      return false
    }
    
    const noteKey = this._getNoteKey(title)
    if (storage.getItem(noteKey)) {
      console.error('note exsit!')
      return false
    }

    const createTime = new Date().getTime()
    const modifyTime = createTime
    const result = this.editNote(title, content, createTime, modifyTime)
    if (result) {
      this._addNoteListItem(noteKey, title, modifyTime)
    }
    return result
  }

  editNote (title, content, modifyTime = new Date().getTime(), createTime) {
    const noteKey = this._getNoteKey(title)
    const value = {
      modifyTime,
      title,
      content: encodeURIComponent(content)
    }
    if (createTime) {
      value.createTime = createTime
    }
    this._editNoteListItem(noteKey, title, modifyTime)
    return storage.setItem(noteKey, value)
  }

  deleteNote (title) {
    const noteKey = this._getNoteKey(title)
    this._removeNoteListItem(noteKey)
    return storage.removeItem(noteKey)
  }
}

const dataManagerInstance = new DataManager()

export default dataManagerInstance