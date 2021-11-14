import { useState, useEffect, useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import useFetch from './useFetch'
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
  const { fetchData: createProduct } = useFetch(`/admin/products`, {
    method: 'POST'
  })
  const { fetchData: getProductsPage } = useFetch(`/admin/products/page/1`)

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
        createProduct({
          bodyData: productDetail,
          handler: () => {
            removeNewProductFromLocalStorage()
            getProductsPage({
              handler: (value) => {
                history.push(`/admin/products/${value?.totalPage}`)
              },
              errorHandler: () => {
                history.push('/admin/products/1')
              }
            })
          },
          errorHandler: (error) => {
            alert(error.message)
          }
        })
      }
    },
    [productDetail, isChecked, history, getProductsPage, createProduct]
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
