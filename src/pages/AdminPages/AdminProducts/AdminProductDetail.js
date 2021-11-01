import { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Tabs } from '../../../components/admin/productManage/Tab'
import { FormWrapper } from '../../../components/admin/productManage/FormStyle'
import ImgForm from '../../../components/admin/productManage/AdminDetailForms/ImgForm'
import DescForm from '../../../components/admin/productManage/AdminDetailForms/DescForm'
import InfoForm from '../../../components/admin/productManage/AdminDetailForms/InfoForm'
import { getProductById } from '../../../webAPI/adminProductsAPI'
import { LoadingContext } from '../../../context'
import { AdminIsLoadingComponent } from '../../../components/admin/AdminIsLoading'

export default function AdminProductDetail() {
  const [productDetail, setProductDetail] = useState([])
  const { isLoading, setIsLoading } = useContext(LoadingContext)
  const { id } = useParams()
  let history = useHistory()

  useEffect(() => {
    setIsLoading(true)
    getProductById(parseInt(id)).then((result) => {
      if (!result) return
      if (result.ok === 0) return history.push('/404')
      const data = JSON.parse(JSON.stringify(result.data))
      setProductDetail(() => data)
      setIsLoading(false)
    })
  }, [id, setIsLoading, history])

  return (
    <FormWrapper>
      {isLoading && <AdminIsLoadingComponent />}
      {!isLoading && (
        <Tabs
          tabs={['商品圖片', '商品敘述', '商品資訊']}
          tabsPanel={[
            <ImgForm product={productDetail} />,
            <DescForm product={productDetail} />,
            <InfoForm product={productDetail} />
          ]}
          presetTab={0}
        ></Tabs>
      )}
    </FormWrapper>
  )
}
