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

    describe('check prefix rules', function () {
        it('should return true if prefix and length is satisfied', function () {
            expect(porter.isSatisfiedPrefix(new porter.Rule(5, ["pa"]), "paulina")).to.equal(true)
        })
        it('should return false if prefix is present but the word is too short', function () {
            expect(porter.isSatisfiedPrefix(new porter.Rule(15, ["pa"]), "paulina")).to.equal(false)
        })
        it('should return false if length is satisfied but prefix is not present', function () {
            expect(porter.isSatisfiedPrefix(new porter.Rule(5, ["ina"]), "paulina")).to.equal(false)
        })
        it('should return false if both prefix and length are not satisfied', function () {
            expect(porter.isSatisfiedPrefix(new porter.Rule(25, ["foo"]), "paulina")).to.equal(false)
        })
    })

    describe('check suffix rules', function () {
        it('should return true if suffix and length is satisfied', function () {
            expect(porter.isSatisfiedSuffix(new porter.Rule(5, ["a"]), "paulina")).to.equal(true)
        })
        it('should return false if suffix is present but the word is too short', function () {
            expect(porter.isSatisfiedSuffix(new porter.Rule(15, ["na"]), "paulina")).to.equal(false)
        })
        it('should return false if suffix is satisfied but prefix is not present', function () {
            expect(porter.isSatisfiedSuffix(new porter.Rule(5, ["foo"]), "paulina")).to.equal(false)
        })
        it('should return false if suffix prefix and length are not satisfied', function () {
            expect(porter.isSatisfiedSuffix(new porter.Rule(25, ["foo"]), "paulina")).to.equal(false)
        })
    })

    describe('check prefix length', function () {
        it('should return correct length if prefix is present in word', function () {
            expect(porter.getPrefixToRemoveLength("paulina", [new porter.Rule(5, ["p"], 1)])).to.equal(1)
        })
        it('should return 0 if prefix is not present in word', function () {
            expect(porter.getPrefixToRemoveLength("paulina", [new porter.Rule(5, ["d"], 1)])).to.equal(0)
        })
    })

    describe('check suffix length', function () {
        it('should return correct length if suffix is present in word', function () {
            expect(porter.getSuffixToRemoveLength("paulina", [new porter.Rule(5, ["ina"], 2)])).to.equal(2)
        })
        it('should return 0 if suffix is not present in word', function () {
            expect(porter.getSuffixToRemoveLength("paulina", [new porter.Rule(5, ["d"], 1)])).to.equal(0)
        })
    })

    describe('apply prefix rule', function () {
        it('should return the same word is no rule is provided', function () {
            expect(porter.applyPrefixRules([], "paulina")).to.equal("paulina")
        })

        it('should return the same word is rule is not satisified', function () {
            expect(porter.applyPrefixRules([new porter.Rule(10, ["x"], 2)], "paulina")).to.equal("paulina")
        })

        it('should cut prefix according to the satisfied rule', function () {
            expect(porter.applyPrefixRules([new porter.Rule(2, ["pa"], 2)], "paulina")).to.equal("ulina")
        })
    })

    describe('apply suffix rule', function () {
        it('should return the same word is no rule is provided', function () {
            expect(porter.applySuffixRules([], "paulina")).to.equal("paulina").to.equal("paulina")
        })

        it('should return the same word is rule is not satisified', function () {
            expect(porter.applySuffixRules([new porter.Rule(10, ["x"], 2)], "paulina")).to.equal("paulina")
        })

        it('should cut suffix according to the satisfied rule', function () {
            expect(porter.applySuffixRules([new porter.Rule(2, ["ina"], 4)], "paulina")).to.equal("pau")
        })
    })
})