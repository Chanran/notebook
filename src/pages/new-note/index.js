import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {Button, Input, message} from 'antd';

import {StyledContainer} from '../../bizCommon/commonStyle';
import dataManager from '../../bizCommon/dataManager';
import {getQueryParam} from '../../common/url'
import history from '../../common/history'

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
  preTitle = ''
  
  state = {
    note: '',
    title: '',
    isEdit: false
  }

  componentDidMount () {
    const title = getQueryParam('title', this.props.location.search)
    
    if (title) {
      // 编辑模式
      const data = dataManager.getNoteDetail(title)
      const note = decodeURIComponent(data.content)
      this.preTitle = title
      this.setState({
        note,
        title,
        isEdit: true
      })
    }
  }

  newNote = () => {
    const {title, note} = this.state;
    const result = dataManager.newNote(title, note)
    if (result) {
      message.success('新建成功')
      setTimeout(() => {
        history.push('/NoteList')
      }, 500)
    } else {
      message.error('新建失败')
    }
  }

  editNote = () => {
    const {title, note} = this.state;
    const result = dataManager.editNote(title, note)
    if (result) {
      message.success('保存成功')

      setTimeout(() => {
        history.push('/NoteList')
      }, 500)
    } else {
      message.error('保存失败')
    }
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
    const {title, note, isEdit} = this.state;

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
          value={title}
          onChange={this.changeTitle}
          disabled={isEdit}
        />
        <StyledTextarea
          placeholder="记录你的灵感~"
          size="large"
          autosize={{ minRows: 10, maxRows: 10 }}
          value={note}
          onChange={this.changeNote}
        />
        {
          isEdit ? (
            <StyledConfirmButton onClick={this.editNote} type="primary">保存</StyledConfirmButton>
          ) : (
            <StyledConfirmButton onClick={this.newNote} type="primary">新建日记</StyledConfirmButton>
          )
        }
      </StyledContainer>
    )
  }
}