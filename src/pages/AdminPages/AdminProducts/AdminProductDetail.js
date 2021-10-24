import styled from 'styled-components'
// import { ADMIN_COLOR, COLOR, FONT_SIZE } from '../../../constants/style'
import { useState, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Tabs } from '../../../components/admin/productManage/Tab'
import { FormWrapper } from '../../../components/admin/productManage/FormStyle'
import ImgForm from '../../../components/admin/productManage/AdminDetailForms/ImgForm'
import DescForm from '../../../components/admin/productManage/AdminDetailForms/DescForm'
import InfoForm from '../../../components/admin/productManage/AdminDetailForms/InfoForm'
import { getProductById } from '../../../webAPI/adminProductsAPI'

export default function AdminProductDetail() {
  const [productDetail, setProductDetail] = useState([])
  const { id } = useParams()
  useEffect(() => {
    getProductById(id).then((result) => setProductDetail(result.data))
  }, [id])
  console.log(productDetail)

  return (
    <FormWrapper>
      <Tabs
        tabs={['商品圖片', '商品敘述', '商品資訊']}
        tabsPanel={[
          <ImgForm product={productDetail} />,
          <DescForm product={productDetail} />,
          <InfoForm product={productDetail} />
        ]}
        presetTab={0}
      ></Tabs>
    </FormWrapper>
  )
}
