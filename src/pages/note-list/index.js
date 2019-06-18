import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {Button, Input} from 'antd'
import {StyledContainer} from '../../bizCommon/commonStyle'
import dataManager from '../../bizCommon/dataManager'

const StyledNoteList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  height: 500px;
  overflow-y: scroll;
  font-size: 20px;
  color: white;
`
const StyledNoteItem = styled.div`
  width: 500px;
  height: 20px;
  margin-bottom: 5px;
`
const StyledConfirmButton = styled(Button)`
  margin-top: 20px;
  width: 300px;
  height: 40px;
`

export default class NoteList extends Component {
  state = {
    noteList: []
  }

  componentDidMount () {
    const noteList = dataManager.getNoteList()
    
    this.setState({
      noteList
    })
  }

  render () {
    const {
      noteList
    } = this.state;
    
    return (
      <StyledContainer>
        <StyledNoteList>
          {
            noteList.map((note, index) => {
              console.log(note)
              return <div key={index}>{note.title}</div>
            })
          }
        </StyledNoteList>
        <StyledConfirmButton type="primary">新建日记</StyledConfirmButton>
      </StyledContainer>
    )
  }
}
