export interface Order {
  id
  state
  total
  lines: OrderLine[]
}

export interface OrderLine {
  quantity: number
}
