const list = {
  itemTotal() {
    if (typeof window !== "undefined") {
      if (localStorage.getItem('list')) {
        return JSON.parse(localStorage.getItem('list')).length
      }
    }
    return 0
  },
  addItem(item, cb) {
    let list = []
    if (typeof window !== "undefined") {
      if (localStorage.getItem('list')) {
        list = JSON.parse(localStorage.getItem('list'))
      }
      list.push({
        product: item,
        quantity: 1,
        shop: item.shop._id
      })
      localStorage.setItem('list', JSON.stringify(list))
      cb()
    }
  },
  updateList(itemIndex, quantity) {
    let list = []
    if (typeof window !== "undefined") {
      if (localStorage.getItem('list')) {
        list = JSON.parse(localStorage.getItem('list'))
      }
      list[itemIndex].quantity = quantity
      localStorage.setItem('list', JSON.stringify(list))
    }
  },
  getList() {
    if (typeof window !== "undefined") {
      if (localStorage.getItem('list')) {
        return JSON.parse(localStorage.getItem('list'))
      }
    }
    return []
  },
  removeItem(itemIndex) {
    let list = []
    if (typeof window !== "undefined") {
      if (localStorage.getItem('list')) {
        list = JSON.parse(localStorage.getItem('list'))
      }
      list.splice(itemIndex, 1)
      localStorage.setItem('list', JSON.stringify(list))
    }
    return list
  },
  emptyList(cb) {
    if (typeof window !== "undefined") {
      localStorage.removeItem('list')
      cb()
    }
  }
}

export default list
