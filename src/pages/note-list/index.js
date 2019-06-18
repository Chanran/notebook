import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {Button, Input} from 'antd';
import {StyledContainer} from '../../common/commonStyle';

const StyledConfirmButton = styled(Button)`
  margin-top: 20px;
  width: 300px;
  height: 40px;
`

export default class NoteList extends Component {
  render () {
    return (
      <StyledContainer>
        <StyledConfirmButton type="primary">新建日记</StyledConfirmButton>
      </StyledContainer>
    )
  }
}
