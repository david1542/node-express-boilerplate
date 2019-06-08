const errors = require('../errors')

class CRUD {
  constructor (Controller) {
    this.Controller = Controller
  }

  getController () {
    return new this.Controller()
  }

  async create (req, res) {
    const controller = this.getController()
    try {
      const data = await controller.create(req.body)
      res.status(201).json(data)
    } catch (err) {
      errors.handler(req, res)(err)
    }
  }

  async readById (req, res) {
    const controller = this.getController(req)
    try {
      const data = await controller.getById(req.params.id)
      res.json(data)
    } catch (err) {
      errors.handler(req, res)(err)
    }
  }

  async read (req, res) {
    const controller = this.getController(req)
    try {
      const data = await controller.get(req.query)
      res.json(data)
    } catch (err) {
      errors.handler(req, res)(err)
    }
  }

  async update (req, res) {
    const controller = this.getController(req)
    try {
      controller.update(req.params.id, req.body)
      res.status(204).end()
    } catch (err) {
      errors.handler(req, res)(err)
    }
  }

  async delete (req, res) {
    const controller = this.getController(req)
    try {
      await controller.delete(req.params.id)
      res.status(204).end()
    } catch (err) {
      errors.handler(req, res)
    }
  }

  connectTo (router) {
    router.post('/', this.create.bind(this))
    router.get('/:id/', this.readById.bind(this))
    router.put('/:id/', this.update.bind(this))
    router.delete('/:id/', this.delete.bind(this))
    router.get('/', this.read.bind(this))
  }
}

module.exports = { CRUD }
