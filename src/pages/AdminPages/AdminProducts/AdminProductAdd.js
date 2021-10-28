import { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Tabs } from '../../../components/admin/productManage/Tab'
import {
  FormWrapper,
  ButtonGroupForAdd
} from '../../../components/admin/productManage/FormStyle'
import ImgForm from '../../../components/admin/productManage/AdminAddForms/ImgForm'
import DescForm from '../../../components/admin/productManage/AdminAddForms/DescForm'
import InfoForm from '../../../components/admin/productManage/AdminAddForms/InfoForm'

export default function AdminProductAdd() {
  const [productDetail, setProductDetail] = useState({
    status: 'on',
    category: 'home',
    article: 'fragrance'
  })
  const [isChecked, setIsChecked] = useState({
    name: false,
    price: false,
    discountPrice: false,
    category: true,
    quantity: false,
    status: true,
    shortDesc: false,
    longDesc: false,
    article: true,
    imgsData: false
  })
  let history = useHistory()
  const handleLeaveClick = useCallback(
    (e) => {
      e.preventDefault()
      history.push('/admin/products/1')
    },
    [history]
  )
  const handleSaveClick = useCallback(
    (e) => {
      e.preventDefault()
      console.log(productDetail)
      console.log(isChecked)
    },
    [productDetail, isChecked]
  )
  return (
    <form>
      <FormWrapper>
        <Tabs
          tabs={['商品圖片', '商品敘述', '商品資訊']}
          tabsPanel={[
            <ImgForm
              productDetail={productDetail}
              setProductDetail={setProductDetail}
              setIsChecked={setIsChecked}
              isChecked={isChecked}
            />,
            <DescForm
              productDetail={productDetail}
              setProductDetail={setProductDetail}
              setIsChecked={setIsChecked}
              isChecked={isChecked}
            />,
            <InfoForm
              productDetail={productDetail}
              setProductDetail={setProductDetail}
              setIsChecked={setIsChecked}
              isChecked={isChecked}
            />
          ]}
          presetTab={0}
        ></Tabs>
      </FormWrapper>
      <ButtonGroupForAdd
        onLeaveClick={handleLeaveClick}
        onSaveClick={handleSaveClick}
      />
    </form>
  )
}
