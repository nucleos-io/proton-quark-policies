'use strict'

let path = require('path')
let Quark = require('proton-quark')
let _ = require('lodash')

/**
 * @class PoliciesQuark
 * @classdesc This quark is for instance policies
 * @author Luis Hernandez
 */
class PoliciesQuark extends Quark {

  constructor(proton) {
    super(proton)
  }

  /**
   * @override
   * @method configure
   * @description Ask if the proton.app.policies object exist, if not exist
   * the method create the proton.app.policies object
   * @author Luis Hernandez
   */
  configure() {
    if (!this.proton.app.policies)
      this.proton.app.policies = {}
  }


  /**
   * @override
   * @method initialize
   * @description instance all policies of the app
   * @author Luis Hernandez
   */
  initialize() {
    _.forEach(this._policies, (Policie, fileName) => {
      const policie = new Policie(this.proton)
      policie.fileName = fileName
      policie.expose(policie)
      this.bindToApp(policie)
      return policie
    })
  }

  bindToApp(...args) {
    const policy = args[0]
    this.proton.app.policies[policy.name] = policy
  }

  /**
   * @method controllers
   * @description This method get the export value of each policy present
   * in the policies folder
   * @author Luis Hernandez
   * @return {Array} - All policies exported values as an array
   */
  get _policies() {
    const policiesPath = path.join(this.proton.app.path, '/policies')
    return require('require-all')(policiesPath)
  }

}

module.exports = PoliciesQuark
