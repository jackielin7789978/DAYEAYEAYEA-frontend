import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Tabs } from '../../../components/admin/productManage/Tab'
import { FormWrapper } from '../../../components/admin/productManage/FormStyle'
import useFetch from '../../../hooks/useFetch'
import ImgForm from '../../../components/admin/productManage/AdminDetailForms/ImgForm'
import DescForm from '../../../components/admin/productManage/AdminDetailForms/DescForm'
import InfoForm from '../../../components/admin/productManage/AdminDetailForms/InfoForm'
import { AdminIsLoadingComponent as Loading } from '../../../components/admin/AdminIsLoading'

export default function AdminProductDetail() {
  const [productDetail, setProductDetail] = useState([])
  const { id } = useParams()
  const { isLoading, fetchData } = useFetch(`/admin/products/${parseInt(id)}`)
  let history = useHistory()

  useEffect(() => {
    fetchData({
      handler: (value) => {
        setProductDetail((products) => JSON.parse(JSON.stringify(value?.data)))
      },
      errorHandler: () => {
        history.push('/admin/404')
      }
    })
  }, [fetchData, history])

  return (
    <FormWrapper>
      {isLoading ? (
        <Loading />
      ) : (
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
