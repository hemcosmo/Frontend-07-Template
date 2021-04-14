var assert = require('assert')
import parseHTML from './parser'

describe('html parser testing', function () {
  it('<div>box</div>', function () {
    parseHTML('<div>box</div>')
    parser.equal(0, 0)
  })
})
