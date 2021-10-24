import { useEffect } from 'react'
import { useContext, useState } from 'react'
import styled from 'styled-components'
import { FONT_SIZE, ADMIN_COLOR, COLOR } from '../../../../constants/style'
import {
  Form,
  Input,
  InputTitle,
  FormTitle,
  FormTitleBorder,
  Dropdown
} from '../FormStyle'

const QuantityInput = styled(Input)`
  margin-top: 8px;
  width: 100%;
`
const DetailForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 30px;
  height: 100%;
`
const ComponentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
`

function FormTitleComponent({ title }) {
  return (
    <>
      <FormTitle>{title}</FormTitle>
      <FormTitleBorder />
    </>
  )
}

export default function DetailInfoForm({ product }) {
  return <DetailForm></DetailForm>
}
