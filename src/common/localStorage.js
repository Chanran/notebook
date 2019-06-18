const storage = window.localStorage

class Storage {
  static getItem(key) {
    key = key.toString()
    let result = storage.getItem(key) 
    try {
      result = JSON.parse(result)
    } catch (error) {
      console.error(error)
    }
    return result
  }

  static setItem(key, value) {
    key = key.toString()

    try {
      value = JSON.stringify(value)
      storage.setItem(key, value) 
      return value
    } catch (error) {
      console.error(error)
      return false
    }
  }

  static removeItem (key) {
    key = key.toString()

    try {
      storage.removeItem(key)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  static clear () {
    try {
      storage.clear()
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
}

export default Storage;