import request from 'utils/request'


export const addCategory = newCategory =>
  request.post('category', newCategory)

export const removeCategory = categoryId =>
  request.delete(`category/${categoryId}`)

export const getCategories = () =>
  request.get(`categories`)

export const updateCategory = (categoryId, data) =>
  request.patch(`category/${categoryId}`, data)
