import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-px2vw'
import {Button, Input, message} from 'antd'
import {StyledContainer} from '../../bizCommon/commonStyle'
import dataManager from '../../bizCommon/dataManager'

const StyledNoteList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 600px;
  max-height: 500px;
  overflow-y: scroll;
  font-size: 20px;
  color: white;
`
const StyledNoteContainer = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  margin-bottom: 5px;
`
const StyledNoteItem = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: 10px;
  border-radius: 5px;
  height: 100%;
  width: 530px;  
  background-color: white;
  color: gray;
`
const StyledDeleteButton = styled(Button)`
  width: 60px;
  height: 60px;
`
const StyledNoteTitle = styled.span`
  margin-left: 10px;
  margin-right: 10px;
  width: 370px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const StyledNoteModifyTime = styled.span`
  width: 150px;
  font-size: 14px;
`

const StyledConfirmButton = styled(Button)`
  margin-top: 20px;
  width: 600px;
  height: 60px;
`

export default class NoteList extends Component {
  state = {
    noteList: []
  }

  componentDidMount () {
    this.updateNoteList()
  }

  updateNoteList = () => {
    const noteList = dataManager.getNoteList()
    
    this.setState({
      noteList
    })
  }

  deleteNote (note) {
    const result = dataManager.deleteNote(note.title)
    const {noteList} =  this.state;
    if (result) {
      message.success('删除成功')
      const newNoteList = noteList.filter((item) => {
        return item.title !== note.title
      })
      
      this.setState({
        noteList: newNoteList
      })
    } else {
      message.error('删除失败')
    }
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
              const modifyTime = new Date(note.modifyTime).toLocaleDateString()
              return (
                <StyledNoteContainer
                  key={note.title}
                >
                  <StyledNoteItem
                    to={`/NewNote?title=${encodeURIComponent(note.title)}`}
                  >
                    <StyledNoteTitle>
                      {note.title}
                    </StyledNoteTitle>
                    <StyledNoteModifyTime>
                      {modifyTime}
                    </StyledNoteModifyTime>
                  </StyledNoteItem>
                  <StyledDeleteButton
                    type="danger"
                    icon="delete"
                    onClick={() => this.deleteNote(note)}
                  />
                </StyledNoteContainer> 
              )
            })
          }
        </StyledNoteList>
        <Link to="/NewNote">
          <StyledConfirmButton type="primary">新建日记</StyledConfirmButton>
        </Link>
      </StyledContainer>
    )
  }
}
