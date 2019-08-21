import request from 'utils/request'

export const fetchPublishes = pageCode => 
  request.get(`publishes/${pageCode}`)

export const getPublish = publish_id =>
  request.get(`publish/${publish_id}`)

export const updatePublish = (publish_id, updateData) => 
  request.put(`publish/${publish_id}`, updateData)