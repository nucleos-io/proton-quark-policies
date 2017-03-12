const Quark = require('../')
const chai = require('chai')
const Proton = require('proton-koa')
const expect = chai.expect

global.proton = new Proton()

describe('Quark policies test',  () => {

  before(() => {
    proton.app = {}
    proton.app.path = __dirname
  })

  it('Should instantiate the quark', done => {
    const quark = new Quark(proton)
    quark.configure()
      .then(() => quark.initialize())
      .then(() => done())
  })


})
