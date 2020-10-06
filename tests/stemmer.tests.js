import { describe, it } from 'mocha'
import { expect } from 'chai'
import { getStem } from '../lib/stemmer'

describe('stemmer', function () {
  it('always returns stem', function () {
    const expected = 'rdzen'
    const actual = getStem('test')
    console.log(expected)
    console.log(actual)
    console.log(actual == expected)

    expect(expected).to.equal(actual)
  })
})
