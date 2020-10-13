import { describe, it } from 'mocha'
import { expect } from 'chai'

import * as porter from '../lib/porter'

describe('porter functions tests', function () {
    describe('check if any of the provided prefix is present in word', function() {
        it('should return true if word prefix is in provided list', function () {
        expect(porter.startsWithAny("paulina", ["pau"])).to.equal(true)
        })
    
        it('should return false if word prefix is not in provided list', function () {
        expect(porter.startsWithAny("paulina", ["foo"])).to.equal(false)
        })
    
        it('should return false if provided list is empty', function () {
        expect(porter.startsWithAny("paulina", [])).to.equal(false)
        })
    
        it('should return false if provided word is empty', function () {
        expect(porter.startsWithAny("", ["foo", "foo2"])).to.equal(false)
        })
    })

    describe('check if any of the provided suffix is present in word', function() {
        it('should return true if word suffix is in provided list', function () {
        expect(porter.endsWithAny("paulina", ["na"])).to.equal(true)
        })
    
        it('should return false if word suffix is not in provided list', function () {
        expect(porter.endsWithAny("paulina", ["foo"])).to.equal(false)
        })
    
        it('should return false if provided list is empty', function () {
        expect(porter.endsWithAny("paulina", [])).to.equal(false)
        })
    
        it('should return false if provided word is empty', function () {
        expect(porter.endsWithAny("", ["foo", "foo2"])).to.equal(false)
        })
    })
    
    describe('word is longer than provided number', function () {
        it('should return true for word with length longer than provided value', function () {
        expect(porter.isLongerThan("paulina", 2)).to.equal(true)
        })
    
        it('should return false for word with length longer equal to provided value', function () {
        expect(porter.isLongerThan("paulina", 7)).to.equal(false)
        })
    
        it('should return false for word with length longer than provided value', function () {
        expect(porter.isLongerThan("paulina", 10)).to.equal(false)
        })
    })

    describe('remove prefix', function () {
        it('should remove nothing if the length of prefix is 0', function () {
        expect(porter.removePrefix("paulina", 0)).to.equal("paulina")
        })
    
        it('should return empty string if the length of prefix is longer than word', function () {
        expect(porter.removePrefix("paulina", 10)).to.equal("")
        })
    
        it('should remove correct number of chars from the begining', function () {
        expect(porter.removePrefix("paulina", 3)).to.equal("lina")
        })
    
        it('should return empty string if the word was empty', function () {
        expect(porter.removePrefix("", 3)).to.equal("")
        })
    
        it('should return the same string if provided number was negative', function () {
        expect(porter.removePrefix("paulina", -3)).to.equal("paulina")
        })
    })

    describe('remove suffix', function () {
        it('should remove nothing if the length of suffix is 0', function () {
        expect(porter.removeSuffix("paulina", 0)).to.equal("paulina")
        })

        it('should return empty string if the length of suffix is longer than word', function () {
        expect(porter.removeSuffix("paulina", 10)).to.equal("")
        })

        it('should remove correct number of chars from the ending', function () {
        expect(porter.removeSuffix("paulina", 3)).to.equal("paul")
        })

        it('should return empty string if the word was empty', function () {
        expect(porter.removeSuffix("", 3)).to.equal("")
        })

        it('should return the same string if provided number was negative', function () {
        expect(porter.removeSuffix("paulina", -3)).to.equal("paulina")
        })
    })


})