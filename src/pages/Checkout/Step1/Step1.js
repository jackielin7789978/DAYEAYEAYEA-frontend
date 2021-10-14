// import { useState, useEffect, useCallback } from 'react'
// import { Link } from 'react-router-dom'
// import { PageWidth } from '../../../components/general'
// import {
//   Title,
//   Steps,
//   TitleWidth,
//   TitleGroup,
//   CartTitles,
//   CartTitle,
//   TotalPrice,
//   BtnFlex,
//   LinkStyle
// } from '../../../components/checkoutSystem/Step'
// import { setCartItems, getCartItems } from '../../../utils'
// import { GeneralBtn } from '../../../components/Button'
// import { Cart } from './Cart'
// export default function Step1() {
//   const [cart, setCart] = useState(() => {
//     if (getCartItems()) {
//       let itemData = getCartItems()
//       return JSON.parse(itemData)
//     }
//     return []
//   })
//   const [totalPrice, setTotalPrice] = useState(0)
//   const handleAddProduct = () => {
//     let random = Math.floor(Math.random() * 10) + 1
//     fetch(`https://api.coolizz.tw/products/${random}`)
//       .then((res) => res.json())
//       .then((res) =>
//         setCart([
//           ...cart,
//           {
//             id: res.data.id,
//             name: res.data.name,
//             price: res.data.price,
//             imgUrl: res.data.Product_imgs[0].imgUrlSm,
//             count: 1
//           }
//         ])
//       )
//   }
//   useEffect(() => {
//     setCartItems(JSON.stringify(cart))
//     setTotalPrice(
//       cart.reduce((total, item) => {
//         return total + item.price * item.count
//       }, 0)
//     )
//   }, [cart])

//   const handleItemDelete = (id) => {
//     setCart(cart.filter((item) => item.id !== id))
//   }
//   const handleUpdateCount = useCallback((count, id) => {
//     if (count < 1) {
//       return setCart((c) => c.filter((item) => item.id !== id))
//     }
//     setCart((c) =>
//       c.map((item) => {
//         if (item.id !== id) return item
//         return {
//           ...item,
//           count
//         }
//       })
//     )
//   }, [])
//   return (
//     <PageWidth>
//       <div onClick={handleAddProduct}>
//         <GeneralBtn color='primary' children='加入購物車' />
//       </div>
//       <Steps />
//       <Title>{`購物車( ${cart.length} 件)`}</Title>
//       <CartTitles>
//         <TitleWidth />
//         <TitleGroup>
//           <CartTitle>購買項目</CartTitle>
//           <CartTitle>金額</CartTitle>
//           <CartTitle>數量</CartTitle>
//         </TitleGroup>
//       </CartTitles>
//       {cart.map((item) => (
//         <Cart
//           key={item.id}
//           item={item}
//           handleItemDelete={handleItemDelete}
//           handleUpdateCount={handleUpdateCount}
//         />
//       ))}
//       <TotalPrice>{`總金額 NT$ ${totalPrice}`}</TotalPrice>
//       <BtnFlex>
//         <Link style={LinkStyle} to='/'>
//           <GeneralBtn color='accent' children='繼續購物' />
//         </Link>
//         <Link style={LinkStyle} to='/checkout/step2'>
//           <GeneralBtn color='primary' children='前往結帳' />
//         </Link>
//       </BtnFlex>
//     </PageWidth>
//   )
// }
