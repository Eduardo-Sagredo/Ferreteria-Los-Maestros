import api from './axiosConfig.js'

const productoService = {

  obtenerTodos: async () => {
    const response = await api.get('/productos')
    return response.data
  },

  obtenerPorId: async (id) => {
    const response = await api.get(`/productos/${id}`)
    return response.data
  },

  crear: async (producto) => {
    const response = await api.post('/productos', producto)
    return response.data
  },

  actualizar: async (id, producto) => {
    const response = await api.put(`/productos/${id}`, producto)
    return response.data
  },

  eliminar: async (id) => {
    await api.delete(`/productos/${id}`)
  }

}

export default productoService