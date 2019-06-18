import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {Button, Input} from 'antd';

import {StyledContainer} from '../../bizCommon/commonStyle';

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
  render() {
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
        <StyledTextarea
          placeholder="记录你的灵感~"
          size="large"
          autosize={{ minRows: 10, maxRows: 10 }}
        />
        <StyledConfirmButton type="primary">记录</StyledConfirmButton>
      </StyledContainer>
    )
  }
}