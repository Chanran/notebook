import React from 'react'
import { Link } from 'react-router-dom'

const NewNote = () => (
  <div>
    <p>this is NewNote page</p>
    <Link to="/NoteList">goto NoteList</Link>
  </div>
)

export default NewNote