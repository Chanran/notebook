import React from 'react'
import { Link } from 'react-router-dom'

const NoteList = () => (
  <div>
    <p>this is NoteList page</p>
    <Link to="/NewNote">goto NewNote</Link>
  </div>
)

export default NoteList