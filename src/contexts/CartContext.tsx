import { ReactNode, createContext, useEffect, useState } from 'react'

interface CartContextProviderProps {
  children: ReactNode
}

interface PaymentFormData {
  paymentType: 'cash' | 'credit' | 'debit'
}

interface CustomerAddressData {
  zipCode: string
  address: string
  adressNumber: string
  complement?: string
  neighborhood: string
  city: string
  state: string
}

interface ProductData {
  name: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  cartList: ProductData[]
  addNewOrUpdateCartItem: (item: ProductData) => void
  removeCartItem: (item: ProductData) => void
  customerAddress: CustomerAddressData
  addCustomerAddress: (customerAddress: CustomerAddressData) => void
  paymentForm: PaymentFormData
  addPaymentForm: (newPaymentForm: PaymentFormData) => void
  getAmountItensInCart: () => number
  getTotalPriceInCart: () => number
  clearCartStorage: () => void
}

export const CartContext = createContext({} as CartContextType)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartList, setCartList] = useState<ProductData[]>(() => {
    const storedStateAsJSON = localStorage.getItem(
      '@coffee-delivery:cart-1.0.0',
    )

    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON)
    }

    return []
  })

  const [customerAddress, setCustomerAddress] = useState<CustomerAddressData>(
    {} as CustomerAddressData,
  )
  const [paymentForm, setPaymentForm] = useState<PaymentFormData>(
    {} as PaymentFormData,
  )

  function addNewOrUpdateCartItem(item: ProductData) {
    const updatedCartList = cartList.filter(
      (cartItem) => cartItem.name !== item.name,
    )
    setCartList([...updatedCartList, item])
  }

  function removeCartItem(item: ProductData) {
    const updatedCartList = cartList.filter(
      (cartItem) => cartItem.name !== item.name,
    )
    setCartList(updatedCartList)
  }

  function addCustomerAddress(newCustomerAddress: CustomerAddressData) {
    setCustomerAddress(newCustomerAddress)
  }

  function addPaymentForm(newPaymentForm: PaymentFormData) {
    setPaymentForm(newPaymentForm)
  }

  function getAmountItensInCart() {
    const totalAmount = cartList.reduce((total, current) => {
      return total + current.quantity
    }, 0)

    return totalAmount
  }

  function getTotalPriceInCart() {
    const totalPrice = cartList.reduce((total, current) => {
      return total + current.quantity * current.price
    }, 0)

    return totalPrice
  }

  function clearCartStorage() {
    localStorage.setItem('@coffee-delivery:cart-1.0.0', '')
  }

  useEffect(() => {
    if (cartList) {
      const stateJSON = JSON.stringify(cartList)

      localStorage.setItem('@coffee-delivery:cart-1.0.0', stateJSON)
    }
  }, [cartList])

  return (
    <CartContext.Provider
      value={{
        cartList,
        addNewOrUpdateCartItem,
        removeCartItem,
        customerAddress,
        addCustomerAddress,
        paymentForm,
        addPaymentForm,
        getAmountItensInCart,
        getTotalPriceInCart,
        clearCartStorage,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
