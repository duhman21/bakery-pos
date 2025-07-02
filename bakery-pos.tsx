"use client"

import { useState, useEffect, useMemo } from "react"
import {
  FaBars,
  FaCalendarAlt,
  FaClock,
  FaPen,
  FaUserCircle,
  FaPause,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
  FaPowerOff,
} from "react-icons/fa"

const categoryItems = [
  { name: "All Menu", count: 110, icon: "🍽️" },
  { name: "Breads", count: 20, icon: "🍞" },
  { name: "Cakes", count: 20, icon: "🍰" },
  { name: "Donuts", count: 20, icon: "🍩" },
  { name: "Pastries", count: 20, icon: "🥐" },
  { name: "Sandwich", count: 20, icon: "🥪" },
]

const BakeryPOS = () => {
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [orderItems, setOrderItems] = useState([
    { id: 1, name: "Beef Crowich", price: 5.5, qty: 1 },
    { id: 2, name: "Sliced Black Forest", price: 5.0, qty: 2 },
    { id: 3, name: "Solo Floss Bread", price: 4.5, qty: 1 },
  ])
  const [selectedCategory, setSelectedCategory] = useState("All Menu")
  const [showPromoModal, setShowPromoModal] = useState(false)
  const [promoValue, setPromoValue] = useState("")
  const [promoType, setPromoType] = useState("percentage") // "percentage" or "fixed"
  const [appliedPromo, setAppliedPromo] = useState(null)
  const userName = "John Doe"
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  // Memoized calculations for performance and reactivity
  const subtotal = useMemo(() => {
    return orderItems.reduce((sum, item) => sum + item.price * item.qty, 0)
  }, [orderItems])

  const { discount, validPromo } = useMemo(() => {
    if (!appliedPromo || orderItems.length === 0 || subtotal === 0) {
      return { discount: 0, validPromo: null }
    }

    let discountAmount = 0
    let isValid = true

    if (appliedPromo.type === "percentage") {
      // For percentage, check if it's still valid (≤ 100%)
      if (appliedPromo.value > 100) {
        isValid = false
      } else {
        discountAmount = (subtotal * appliedPromo.value) / 100
      }
    } else {
      // For fixed amount, cap at subtotal
      discountAmount = Math.min(appliedPromo.value, subtotal)
    }

    return {
      discount: isValid ? discountAmount : 0,
      validPromo: isValid ? appliedPromo : null,
    }
  }, [appliedPromo, subtotal, orderItems.length])

  const tax = useMemo(() => {
    const taxableAmount = Math.max(0, subtotal - discount)
    return taxableAmount * 0.15
  }, [subtotal, discount])

  const total = useMemo(() => {
    return Math.max(0, subtotal - discount + tax)
  }, [subtotal, discount, tax])

  // Effect to handle promo validation and cleanup
  useEffect(() => {
    if (appliedPromo && validPromo !== appliedPromo) {
      // Remove invalid promo
      setAppliedPromo(validPromo)
    }
  }, [appliedPromo, validPromo])

  // Effect to remove promo when cart becomes empty
  useEffect(() => {
    if (orderItems.length === 0 && appliedPromo) {
      setAppliedPromo(null)
    }
  }, [orderItems.length, appliedPromo])

  const addItemToOrder = (item) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((orderItem) => orderItem.name === item.name)
      if (existingItem) {
        return prevItems.map((orderItem) =>
          orderItem.name === item.name ? { ...orderItem, qty: orderItem.qty + 1 } : orderItem,
        )
      } else {
        return [...prevItems, { id: Date.now(), name: item.name, price: item.price, qty: 1 }]
      }
    })
  }

  const updateItemQuantity = (itemId, change) => {
    setOrderItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.qty + change
            return newQty > 0 ? { ...item, qty: newQty } : null
          }
          return item
        })
        .filter(Boolean)
    })
  }

  const handlePromoApply = () => {
    const value = Number.parseFloat(promoValue)
    if (isNaN(value) || value <= 0) return

    // Check if cart is empty
    if (orderItems.length === 0 || subtotal === 0) return

    // Validation
    if (promoType === "percentage" && value > 100) return
    if (promoType === "fixed" && value > subtotal) return

    setAppliedPromo({
      type: promoType,
      value: value,
    })
    setShowPromoModal(false)
    setPromoValue("")
  }

  const handlePromoCancel = () => {
    setShowPromoModal(false)
    setPromoValue("")
  }

  const removePromo = () => {
    setAppliedPromo(null)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    // In a real app, you would clear tokens, redirect, etc.
    window.location.href = "/login" // or use router.push('/login')
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowOrderDetails(true) // Always expanded on desktop
      }
    }

    // Set initial state based on screen size
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-gray-50">
      {/* Left Menu */}
      <div className="w-full md:w-2/3 p-4 overflow-auto border">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full border border-gray-200 shadow-sm bg-white">
              <FaBars className="text-gray-600" />
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-white rounded-full border border-gray-200 shadow-sm text-xs whitespace-nowrap">
              <FaCalendarAlt className="text-gray-600" />
              <span className="text-gray-800">29 May</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-white rounded-full border border-gray-200 shadow-sm text-xs whitespace-nowrap">
              <FaClock className="text-gray-600" />
              <span className="text-gray-800">07:59</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-2 py-1 bg-white rounded-full border border-gray-200 shadow-sm text-xs whitespace-nowrap hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-green-700 font-medium">Open</span>
            <FaPowerOff className="text-gray-400 ml-1" size={10} />
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-3 mb-4 overflow-x-auto scrollbar-hide">
          {categoryItems.map((cat, i) => {
            const isSelected = cat.name === selectedCategory
            return (
              <div
                key={i}
                onClick={() => setSelectedCategory(cat.name)}
                className={`min-w-[7rem] flex-shrink-0 h-28 flex flex-col justify-center items-center rounded-2xl border shadow-sm cursor-pointer transition-all ${
                  isSelected ? "border-blue-500 text-blue-600 bg-blue-50" : "border-gray-200 text-gray-700 bg-white"
                }`}
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full mb-2 ${
                    isSelected ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <span className="text-xl">{cat.icon}</span>
                </div>
                <div className="text-sm font-medium">{cat.name}</div>
                <div className="text-xs text-gray-500">{cat.count} Items</div>
              </div>
            )
          })}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search something sweet on your mind..."
          className="w-full mb-4 p-3 rounded-2xl border border-gray-200 text-sm shadow-sm bg-white"
        />

        {/* Items */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Beef Crowich", price: 5.5 },
            { name: "Buttermelt Croissant", price: 4.0 },
            { name: "Cereal Cream Donut", price: 2.45 },
            { name: "Cheesy Cheesecake", price: 3.75 },
            { name: "Cheezy Sourdough", price: 4.5 },
            { name: "Egg Tart", price: 3.25 },
            { name: "Grains Pan Bread", price: 4.5 },
            { name: "Spinchoco Roll", price: 4.0 },
          ].map((item, i) => (
            <div
              key={i}
              className="border rounded-lg p-2 text-center bg-white shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => addItemToOrder(item)}
            >
              <div className="h-20 bg-gray-100 rounded mb-2"></div>
              <div className="text-sm font-medium">{item.name}</div>
              <div className="text-xs text-gray-400">${item.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Panel */}
      <div className="w-full md:w-1/3 bg-white md:h-full">
        {/* Mobile Collapsed View */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out transform ${
            showOrderDetails
              ? "translate-y-0 opacity-0 pointer-events-none scale-95"
              : "translate-y-0 opacity-100 pointer-events-auto scale-100"
          }`}
        >
          <div className="p-4 border-b cursor-pointer bg-white shadow-sm" onClick={() => setShowOrderDetails(true)}>
            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="font-medium">Eloise's Order</div>
                <div className="text-xs text-gray-400">Order #005 • {orderItems.length} items</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">${total.toFixed(2)}</span>
                <FaChevronUp className="text-gray-400 transition-transform duration-300" />
              </div>
            </div>

            {/* Quick Action Buttons - Always Visible */}
            <div className="flex gap-2 mb-3">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-full shadow-sm bg-white text-sm transition-all duration-200 hover:bg-gray-50">
                <FaPause className="text-gray-600" />
                <span className="text-gray-600">Hold</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-full shadow-sm bg-white text-sm transition-all duration-200 hover:bg-gray-50">
                <FaUserCircle className="text-gray-600" />
                <span className="text-gray-600">{userName}</span>
              </button>
            </div>

            {/* Payment Buttons - Always Visible */}
            <div className="flex items-center gap-2 mb-3">
              <button
                className={`flex-1 text-sm rounded-full px-4 py-2 transition-all duration-200 ${
                  appliedPromo
                    ? "text-green-700 border border-green-600 hover:bg-green-50"
                    : "text-gray-600 border border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setShowPromoModal(true)}
              >
                {appliedPromo ? "Promo Applied" : "Promo"}
              </button>
              <button className="flex-1 text-sm border border-blue-600 text-blue-600 px-4 py-2 rounded-full transition-all duration-200 hover:bg-blue-50">
                QRIS
              </button>
            </div>

            {/* Place Order Button - Always Visible */}
            <button className="w-full bg-blue-600 text-white py-3 rounded-full text-center font-semibold transition-all duration-200 hover:bg-blue-700 shadow-lg">
              Place Order
            </button>
          </div>
        </div>

        {/* Mobile Expanded View */}
        <div
          className={`md:hidden fixed inset-0 z-50 transition-all duration-500 ease-in-out transform ${
            showOrderDetails
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "translate-y-full opacity-0 pointer-events-none"
          } bg-white`}
        >
          <div className="h-screen flex flex-col bg-white shadow-2xl rounded-t-3xl relative">
            {/* Header */}
            <div
              className="p-4 border-b cursor-pointer bg-white shadow-sm flex-shrink-0 rounded-t-3xl"
              onClick={() => setShowOrderDetails(false)}
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <div className="font-medium">Eloise's Order</div>
                  <div className="text-xs text-gray-400">Order #005</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Tap to collapse</span>
                  <FaChevronDown className="text-gray-400 transition-transform duration-300" />
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-full shadow-sm bg-white text-sm transition-all duration-200 hover:bg-gray-50">
                  <FaPause className="text-gray-600" />
                  <span className="text-gray-600">Hold</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-full shadow-sm bg-white text-sm transition-all duration-200 hover:bg-gray-50">
                  <FaUserCircle className="text-gray-600" />
                  <span className="text-gray-600">{userName}</span>
                </button>
              </div>
            </div>

            {/* Items Section - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 pb-80">
              <div className="space-y-4">
                {orderItems.map((item, i) => (
                  <div
                    key={i}
                    className="border-b border-gray-100 pb-4 transition-all duration-200 hover:bg-gray-50 rounded-lg p-2"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="text-sm font-medium">{item.name}</div>
                        <div className="text-xs text-gray-400">${item.price.toFixed(2)}</div>
                        <button className="mt-1 text-xs text-blue-600 flex items-center gap-1 transition-all duration-200 hover:text-blue-800">
                          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 text-white transition-all duration-200 hover:bg-blue-700">
                            <FaPen size={10} />
                          </div>
                          <span>Edit</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="w-8 h-8 flex items-center justify-center border rounded-full text-sm transition-all duration-200 hover:bg-gray-100 active:scale-95"
                          onClick={() => updateItemQuantity(item.id, -1)}
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.qty}</span>
                        <button
                          className="w-8 h-8 flex items-center justify-center border rounded-full text-sm transition-all duration-200 hover:bg-gray-100 active:scale-95"
                          onClick={() => updateItemQuantity(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary - Sticky at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg">
              <div className="space-y-2 mb-4">
                <div className="text-sm flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {appliedPromo && discount > 0 && (
                  <div className="text-sm flex justify-between text-green-600">
                    <span>
                      Discount (
                      {appliedPromo.type === "percentage"
                        ? `${appliedPromo.value}%`
                        : `$${appliedPromo.value.toFixed(2)}`}
                      )
                    </span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="text-sm flex justify-between">
                  <span>VAT (15%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <hr className="my-2 border-dashed" />
                <div className="flex justify-between font-bold text-lg">
                  <span>TOTAL</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Buttons */}
              <div className="flex items-center gap-2 mb-3">
                <button
                  className={`flex-1 text-sm rounded-full px-4 py-2 transition-all duration-200 active:scale-95 ${
                    appliedPromo
                      ? "text-green-700 border border-green-600 hover:bg-green-50"
                      : "text-gray-600 border border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => setShowPromoModal(true)}
                >
                  {appliedPromo ? "Promo Applied" : "Promo"}
                </button>
                <button className="flex-1 text-sm border border-blue-600 text-blue-600 px-4 py-2 rounded-full transition-all duration-200 hover:bg-blue-50 active:scale-95">
                  QRIS
                </button>
              </div>

              {/* Place Order Button */}
              <button className="w-full bg-blue-600 text-white py-3 rounded-full text-center font-semibold transition-all duration-200 hover:bg-blue-700 shadow-lg active:scale-95">
                Place Order
              </button>
            </div>
          </div>
        </div>

        {/* Desktop View - Always Expanded */}
        <div className="hidden md:flex md:flex-col md:h-full">
          {/* Header */}
          <div className="p-6 border-b flex-shrink-0 shadow">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">Eloise's Order</h2>
                <p className="text-sm text-gray-500">Order Number: #005</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <FaPen className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-full shadow-sm bg-white text-sm">
                <FaPause className="text-gray-600" />
                <span className="text-gray-600">Hold</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-full shadow-sm bg-white text-sm">
                <FaUserCircle className="text-gray-600" />
                <span className="text-gray-600">{userName}</span>
              </button>
            </div>
          </div>

          {/* Items Section */}
          <div className="flex-1 overflow-y-auto p-6 px-2.5">
            <div className="space-y-4">
              {orderItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 border rounded-xl">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{item.name}</h4>
                    <p className="text-sm text-gray-600 font-medium">${item.price.toFixed(2)}</p>
                    <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-1">
                      <FaPen size={8} />
                      <span>Edit</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 rounded-full">
                    <button
                      className="w-8 h-8 flex items-center justify-center border rounded-full bg-white"
                      onClick={() => updateItemQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm">{item.qty}</span>
                    <button
                      className="w-8 h-8 flex items-center justify-center border rounded-full bg-white"
                      onClick={() => updateItemQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="p-6 flex-shrink-0 leading-3 border-t border-b-0 border-l-0 py-5 px-3.5">
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {appliedPromo && discount > 0 && (
                <div className="flex justify-between text-sm text-lime-600">
                  <span>
                    Discount (
                    {appliedPromo.type === "percentage"
                      ? `${appliedPromo.value}%`
                      : `$${appliedPromo.value.toFixed(2)}`}
                    )
                  </span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span>VAT (15%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <hr className="border-dashed" />
              <div className="flex justify-between font-semibold">
                <span>TOTAL</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  className={`text-sm rounded-xl transition-all duration-200 leading-3 px-px py-2 my-1 mx-px ${
                    appliedPromo
                      ? "text-green-700 border border-green-600 hover:bg-green-50"
                      : "text-gray-600 border border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => setShowPromoModal(true)}
                >
                  {appliedPromo ? "Promo Applied" : "Promo"}
                </button>
                <button className="text-sm border border-blue-600 text-blue-600 rounded-xl transition-all duration-200 hover:bg-blue-50 py-0 my-1 px-0">
                  QRIS
                </button>
              </div>
              <button className="w-full bg-blue-600 text-white font-semibold transition-all duration-200 hover:bg-blue-700 shadow-lg py-5 rounded-2xl px-0">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Modal */}
      {showPromoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Apply Promo</h3>
                <button onClick={handlePromoCancel} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <FaTimes className="h-4 w-4 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Promo Value Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {promoType === "percentage" ? "Percentage (%)" : "Amount ($)"}
                  </label>
                  <input
                    type="number"
                    value={promoValue}
                    onChange={(e) => setPromoValue(e.target.value)}
                    placeholder={promoType === "percentage" ? "Enter percentage" : "Enter amount"}
                    className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                    inputMode="numeric"
                  />
                </div>

                {/* Toggle Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setPromoType("percentage")}
                    className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                      promoType === "percentage"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Percentage (%)
                  </button>
                  <button
                    onClick={() => setPromoType("fixed")}
                    className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                      promoType === "fixed" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Fixed Amount ($)
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handlePromoCancel}
                    className="flex-1 py-3 px-4 border border-gray-300 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePromoApply}
                    disabled={!promoValue || Number.parseFloat(promoValue) <= 0 || orderItems.length === 0}
                    className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {appliedPromo && (
                  <button
                    onClick={removePromo}
                    className="w-full py-2 px-4 text-red-600 text-sm hover:bg-red-50 rounded-xl transition-colors"
                  >
                    Remove Current Promo
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BakeryPOS
