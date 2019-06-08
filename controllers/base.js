class BaseController {
  constructor (model) {
    this.model = model
  }

  create (data) {
    const model = new this.model(data)
    return model.save()
  }

  get (query) {
    return this.model.find(query)
  }

  getById (id) {
    return this.model.findById(id)
  }

  update (id, data) {
    return this.model.findByIdAndUpdate(id, data, {new: true})
  }

  delete (id) {
    return this.model.deleteOne({ _id: id })
  }
}

module.exports = BaseController
