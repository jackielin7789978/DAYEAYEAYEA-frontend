import { Tabs } from '../../../components/admin/productManage/Tab'
import {
  FormWrapper,
  ButtonGroupForAdd
} from '../../../components/admin/productManage/FormStyle'
import ImgForm from '../../../components/admin/productManage/AdminAddForms/ImgForm'
import DescForm from '../../../components/admin/productManage/AdminAddForms/DescForm'
import InfoForm from '../../../components/admin/productManage/AdminAddForms/InfoForm'
import useCreateProduct from '../../../hooks/useCreateProduct'

export default function AdminProductAdd() {
  const {
    isChecked,
    setIsChecked,
    productDetail,
    setProductDetail,
    handleLeaveClick,
    handleSaveClick
  } = useCreateProduct()
  return (
    <form>
      <FormWrapper>
        <Tabs
          tabs={['商品圖片', '商品敘述', '商品資訊']}
          tabsPanel={[
            <ImgForm
              productDetail={productDetail}
              setProductDetail={setProductDetail}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            />,
            <DescForm
              productDetail={productDetail}
              setProductDetail={setProductDetail}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            />,
            <InfoForm
              productDetail={productDetail}
              setProductDetail={setProductDetail}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
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
