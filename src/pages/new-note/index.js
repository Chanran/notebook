import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {Button, Input} from 'antd';

import {StyledContainer} from '../../bizCommon/commonStyle';
import dataManager from '../../bizCommon/dataManager';

const StyledTitle = styled(Input.TextArea)`
  width: 300px;
  margin-bottom: 20px;
`
const StyledTextarea = styled(Input.TextArea)`
  width: 300px;
`
const StyledBackContainer = styled(Link)`
  position: absolute;
  top: 20px;
  left: 5px;
  color: white;
  font-weight: bold;
  font-size: 18px;
`
const StyledBackListButton = styled(Button)`
  padding: 0;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  background: none;
  border: none;
  color: white;
`

const StyledConfirmButton = styled(Button)`
  margin-top: 20px;
  width: 300px;
  height: 40px;
`

export default class NewNote extends Component {
  state = {
    note: '',
    title: ''
  }

  newNote = () => {
    const {title, note} = this.state;
    dataManager.newNote(title, note)
  }

  changeTitle = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  changeNote = (e) => {
    this.setState({
      note: e.target.value
    })
  }
  
  render() {
    const {title, note} = this.state;

    return (
      <StyledContainer>
        <StyledBackContainer
          to="/NoteList"
        >
          <StyledBackListButton
            icon="left"
            size="large"
          />
          日记列表
        </StyledBackContainer>

        <StyledTitle
          placeholder="标题"
          size="large"
          autosize={{ minRows: 1, maxRows: 1 }}
          defaultValue={title}
          onChange={this.changeTitle}
        />
        <StyledTextarea
          placeholder="记录你的灵感~"
          size="large"
          autosize={{ minRows: 10, maxRows: 10 }}
          defaultValue={note}
          onChange={this.changeNote}
        />
        <StyledConfirmButton onClick={this.newNote} type="primary">新建日记</StyledConfirmButton>
      </StyledContainer>
    )
  }
}