'use strict'

let path = require('path')
let Quark = require('proton-quark')
let _ = require('lodash')

module.exports = class PoliciesQuark extends Quark {

  constructor(proton) {
    super(proton)
  }

  configure() {
    if (!this.proton.app.policies)
      this.proton.app.policies = {}
    return true
  }

  initialize() {
    let policiesPath = path.join(this.proton.app.path, '/policies')
    let policies = require('require-all')(policiesPath)
    _.forEach(policies, Policie => new Policie(this.proton))
  }

}
