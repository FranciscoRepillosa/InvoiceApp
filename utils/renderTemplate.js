exports.renderTemplete = (template) => {
    return (req, res, next) => {
      res.render(template)
    }
  }