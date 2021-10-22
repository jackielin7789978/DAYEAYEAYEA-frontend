import styled from 'styled-components'
// import { ADMIN_COLOR, COLOR, FONT_SIZE } from '../../../constants/style'
import { useState, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GeneralBtn } from '../../../components/Button'
import {
  FormContainer,
  FormTitle,
  FormInputContainer,
  ProductInputSet,
  ProductTextAreaSet,
  ErrorMsgStyle
} from '../../../components/admin/productManage/FormStyle'
import { getProductById } from '../../../webAPI/adminProductsAPI'

// export default function AdminProductDetail() {
//   return <></>
// }

const ProductDetailBtnContainer = styled.div`
  display: flex;
  width: 30%;
`

const ButtonContainer = styled.div`
  width: 40%;
  margin: 0px auto;
`

export default function AdminProductDetail() {
  const { id } = useParams()
  useEffect(() => {
    getProductById(id).then((res) => console.log(res.data))
  }, [id])

  const [inputValue, setInputValue] = useState('')

  const handleOnChange = useCallback((e) => {
    const targetValue = e.target.value.trim(' ')
    console.log(targetValue)
    setInputValue((inputValue) => targetValue)
  }, [])

  return (
    <>
      <FormContainer>
        <FormTitle>商品詳情</FormTitle>
        <FormInputContainer>
          <ProductInputSet
            title='商品名稱: '
            value='來一客鮮蝦魚板'
            className='name'
            name='name'
            error={false}
          />
          <ProductInputSet title='原始售價: ' value='' />
          <ProductInputSet title='特價售價: ' value='18' />
          <ProductInputSet title='商品分類: ' value='home' />
          <ProductInputSet title='庫存數量: ' value='50' />
          <ProductInputSet title='上架狀態: ' value='on' />
          <ProductInputSet title='活動文章: ' value='fragrance' />
          <ProductTextAreaSet
            title='商品簡述: '
            value='好看又好吃好看又好吃好看又好吃好看又好吃好看又好吃好看又好吃'
          />
          <ProductTextAreaSet
            title='商品敘述: '
            value={`季節限定組合內含以下氣味各一款：\n春天選香——海洋舒活\n夏天選香——沁雅薄荷\n秋天選香——柑橘木香\r\n冬天選香——雪松沉香\n\n「TheOlphactory」極簡嗅覺系列，簡約北歐調的清新設計，俐落都會。以天然植物精油與植物蠟提煉，香調雅緻高級，蠟規格為200 克，可以持續燃燒長達 40小時以上。\n\n無論是閒暇時光，或是夜裡的疲勞稀釋，「香氣」引領感官進入更深層次的生活哲學，不僅是享受生活，也是尊重自身日常的表現，重新整頓我們與「家」的親密感`}
          />
          <ProductInputSet title='圖片(1) sm: ' value='img1UrlSm' />
          <ProductInputSet title='圖片(1) md: ' value='img1UrlSm' />
          <ProductInputSet title='圖片(1) lg: ' value='img1UrlSm' />
          <ProductInputSet title='圖片(2) sm: ' value='img1UrlSm' />
          <ProductInputSet title='圖片(2) md: ' value='img1UrlSm' />
          <ProductInputSet title='圖片(2) lg: ' value='img1UrlSm' />
          <ProductInputSet title='圖片(3) sm: ' value='img1UrlSm' />
          <ProductInputSet title='圖片(3) md: ' value='img1UrlSm' />
          <ProductInputSet title='圖片(3) lg: ' value='img1UrlSm' />
        </FormInputContainer>
        <ProductDetailBtnContainer>
          <ButtonContainer type='submit'>
            <GeneralBtn color='admin_blue'>儲存修改</GeneralBtn>
          </ButtonContainer>
          <ButtonContainer>
            <GeneralBtn color='admin_blue'>離開此頁</GeneralBtn>
          </ButtonContainer>
        </ProductDetailBtnContainer>
      </FormContainer>
    </>
  )
}
