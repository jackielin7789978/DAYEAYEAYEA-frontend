import { useState, useEffect, useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import {
  createNewProduct,
  getAllProductsByPage
} from '../webAPI/adminProductsAPI'
import {
  addNewProductToLocalStorage,
  getNewProductFromLocalStorage,
  removeNewProductFromLocalStorage
} from '../utils'

export default function useCreateProduct() {
  let history = useHistory()
  const initProductState = useMemo(() => {
    return {
      status: 'on',
      category: 'home',
      article: 'fragrance',
      name: '',
      longDesc: '',
      shortDesc: '',
      quantity: '',
      price: '',
      discountPrice: '',
      imgsData: [{}, {}, {}]
    }
  }, [])

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
    imgsDataOne: false,
    imgsDataTwo: true,
    imgsDataThree: true
  })

  const [productDetail, setProductDetail] = useState(
    JSON.parse(getNewProductFromLocalStorage()) || initProductState
  )

  useEffect(() => {
    addNewProductToLocalStorage(productDetail)
  }, [productDetail])

  const handleLeaveClick = useCallback(
    (e) => {
      e.preventDefault()
      removeNewProductFromLocalStorage()
      history.push('/admin/products/1')
    },
    [history]
  )

  const handleSaveClick = useCallback(
    (e) => {
      e.preventDefault()
      let isAllChecked
      for (const key in isChecked) {
        if (isChecked[key] === false) {
          isAllChecked = false
          alert('請完整填寫正確商品資訊後再提交')
          return
        }
        isAllChecked = true
      }
      if (isAllChecked) {
        createNewProduct(productDetail).then((result) => {
          if (!result) return
          if (result.ok === 0) return alert(result.message)
          removeNewProductFromLocalStorage()
          getAllProductsByPage(1).then((result) => {
            if (!result || result.ok !== 1)
              return history.push('/admin/products/1')
            history.push(`/admin/products/${result.totalPage}`)
          })
        })
      }
    },
    [productDetail, isChecked, history]
  )

  return {
    isChecked,
    setIsChecked,
    productDetail,
    setProductDetail,
    handleLeaveClick,
    handleSaveClick
  }
}
