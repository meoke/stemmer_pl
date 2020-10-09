import { describe, it } from 'mocha'
import { expect } from 'chai'
import { removeSuffix, removePrefix, getStem, removeNouns, removeDiminutive, removeAdjectiveEnds, removeVerbsEnds, removeAdverbsEnds, removePluralForms, removeGeneralSuffixes, endsWithAny, isLongerThan} from '../lib/stemmer'
// import getStem from '../lib/stemmer'

describe('stemmer end to end tests', function () {
  describe('returns the identical word if the given word is its stem', function() {
    const expectIdentical = (word) => expect(getStem(word)).to.equal(word)
    const words = ['i', 'o', 'nad', 'też', 'nie']

    for (const word of words) {
      it(`stem equal to (${word})`, function () {
        expectIdentical(word)
      })
    }
  })

  describe('returns empty string if the given word is empty, null or not a string', function () {
    const expectEmpty = (word) => expect(getStem(word)).to.equal('')
    const words = ['', 0, null, undefined, {}, []]

    for (const word of words) {
      it(`return empty stem for (${word})`, function () {
        expectEmpty(word)
      })
    }
  })

  describe('returns correct stems', function() {
    const expectStem = (word, stem) => expect(getStem(word)).to.equal(stem)
    const words = [['Kariera', 'karier'],
    ['na', 'na'],
    ['językach', 'język'],
    ['to', 'to'],
    ['wydarzenie', 'wydarz'],
    ['zorganizowane', 'zorganizowa'],
    ['z', 'z'],
    ['myślą', 'myśl'],
    ['o', 'o'],
    ['studentach', 'studen'],
    ['i', 'i'],
    ['absolwentach', 'absolwen'],
    ['znających', 'zna'],
    ['języki', 'język'],
    ['obce', 'obc'],
    ['na', 'na'],
    ['poziomie', 'poziom'],
    ['co', 'co'],
    ['najmniej', 'mniej'],
    ['Będą', 'Będ'],
    ['oni', 'oni'],
    ['mieli', 'mie'],
    ['okazję', 'okazj'],
    ['zastanowić', 'zastanow'],
    ['się', 'się'],
    ['nad', 'nad'],
    ['kierunkami', 'kierunk'],
    ['rozwoju', 'rozwoj'],
    ['własnej', 'własn'],
    ['kariery', 'karier'],
    ['zawodowej', 'zawodow'],
    ['w', 'w'],
    ['oparciu', 'opar'],
    ['o', 'o'],
    ['informacje', 'informacj'],
    ['na', 'na'],
    ['temat', 'temat'],
    ['możliwości', 'możliwoś'],
    ['wykorzystania', 'wykorzysta'],
    ['swoich', 'swoich'],
    ['umiejętności', 'umiejętności'],
    ['lingwistycznych', 'lingiwistyc'],
    ['na', 'na'],
    ['współczesnym', 'współczesn'],
    ['rynku', 'rynk'],
    ['pracy', 'prac'],
    ['dlatego', 'dlatego'],
    ['też', 'też'],
    ['nie', 'nie'],
    ['chcę', 'chc'],
  ];

    for (const [word, stem] of words) {
      it(`correct stem for (${word} -> ${stem})`, function () {
        expectStem(word, stem)
      })
    }
  })
})

describe('prefixes and suffixes removal', function () {
  describe('noun suffixes removal', function () {
    const expectWord = (fullWord, withoutSuffix) => expect(removeNouns(fullWord)).to.equal(withoutSuffix)

    const testCases = [
      ['should remove "acja" from noun > 7 chars', 'organizacja', 'organiz'],
      ['should remove "acją" from noun > 7 chars', 'organizacją', 'organiz'],
      ['should remove "acji" from noun > 7 chars', 'organizacji', 'organiz'],

      ['should remove "acja" from noun > 6 chars', 'kolacja', 'kol'],
      ['should remove "acji" from noun > 6 chars', 'kolacji', 'kol'],
      ['should remove "acją" from noun > 6 chars', 'kolacją', 'kol'],
      ['should remove "tach" from noun > 6 chars', 'absolutach', 'absolu'],
      ['should remove "anie" from noun > 6 chars', 'rozebranie', 'rozebr'],
      ['should remove "enie" from noun > 6 chars', 'seplenienie', 'sepleni'],
      ['should remove "eniu" from noun > 6 chars', 'seplenieniu', 'sepleni'],
      ['should remove "aniu" from noun > 6 chars', 'rozebraniu', 'rozebr'],

      ['should remove "ka" from noun > 6 chars with ending "tyka"', 'matematyka', 'matematy'],

      ['should remove "ach" from noun > 5 chars', 'postrach', 'postr'],
      ['should remove "ami" from noun > 5 chars', 'postrachami', 'postrach'],
      ['should remove "nia" from noun > 5 chars', 'ogłuszania', 'ogłusza'],
      ['should remove "niu" from noun > 5 chars', 'fooniu', 'foo'],
      ['should remove "cia" from noun > 5 chars', 'pobicia', 'pobi'],
      ['should remove "ciu" from noun > 5 chars', 'pobiciu', 'pobi'],

      ['should remove "cji" from noun > 5 chars', 'gracji', 'grac'],
      ['should remove "cja" from noun > 5 chars', 'gracja', 'grac'],
      ['should remove "cją" from noun > 5 chars', 'gracją', 'grac'],

      ['should remove "ce" from noun > 5 chars', 'manowce', 'manow'],
      ['should remove "ta" from noun > 5 chars', 'ochota', 'ocho'],
    ]

    for (const [description, fullWord, withoutSuffix] of testCases) {
      it(description, function () {
        expectWord(fullWord, withoutSuffix)
      })
    }
  })

  describe('noun diminutives removal', function () {
    const expectWord = (fullWord, withoutSuffix) => expect(removeDiminutive(fullWord)).to.equal(withoutSuffix)

    const testCases = [     
      ['should remove "eczek" from noun > 6 chars', 'stołeczek', 'stoł'],
      ['should remove "iczek" from noun > 6 chars', 'stoliczek', 'stol'],
      ['should remove "iszek" from noun > 6 chars', 'modliszek', 'modl'],
      ['should remove "aszek" from noun > 6 chars', 'wujaszek', 'wuj'],
      ['should remove "uszek" from noun > 6 chars', 'kłapouszek', 'kłapo'],
      
      ['should remove "enek" from noun > 6 chars', 'aborygenek', 'aborygen'],
      ['should remove "ejek" from noun > 6 chars', 'pigmejek', 'pigmej'],
      ['should remove "erek" from noun > 6 chars', 'koperek', 'koper'],

      ['should remove "ek" from noun > 4 chars', 'berek', 'ber'],
      ['should remove "ak" from noun > 4 chars', 'lilak', 'lil'],
    ]

    for (const [description, fullWord, withoutSuffix] of testCases) {
      it(description, function () {
        expectWord(fullWord, withoutSuffix)
      })
    }
  })

  describe('adjective prefix and suffix removal', function () {
    const expectWord = (fullWord, expectedWord) => expect(removeAdjectiveEnds(fullWord)).to.equal(expectedWord)

    const testCases = [     
      ['should remove "naj" and "sze" from adjective > 7 chars', 'najlepsze', 'lep'],
      ['should remove "naj" and "szy" from adjective > 7 chars', 'najlepszy', 'lep'],

      ['should remove "naj" and "szych" from adjective > 7 chars', 'najlepszych', 'lep'],

      ['should remove "czny" from adjective > 6 chars', 'stołeczny', 'stołe'],

      ['should remove "owy" from adjective > 5 chars', 'bajkowy', 'bajk'],
      ['should remove "owa" from adjective > 5 chars', 'bajkowa', 'bajk'],
      ['should remove "owe" from adjective > 5 chars', 'bajkowe', 'bajk'],
      ['should remove "ych" from adjective > 5 chars', 'bajkowych', 'bajkow'],
      ['should remove "ego" from adjective > 5 chars', 'bajkowego', 'bajkow'],

      ['should remove "ej" from adjective > 5 chars', 'stołecznej', 'stołeczn']
    ]

    for (const [description, fullWord, expectedWord] of testCases) {
      it(description, function () {
        expectWord(fullWord, expectedWord)
      })
    }
  })

  describe('verb suffix removal', function () {
    const expectWord = (fullWord, expectedWord) => expect(removeVerbsEnds(fullWord)).to.equal(expectedWord)

    const testCases = [     
      ['should remove "bym" from verb > 5 chars', 'zrobiłbym', 'zrobił'],

      ['should remove "esz" from verb > 5 chars', 'weźmiesz', 'weźmi'],
      ['should remove "asz" from verb > 5 chars', 'słuchasz', 'słuch'],
      ['should remove "cie" from verb > 5 chars', 'zróbcie', 'zrób'],
      ['should remove "eść" from verb > 5 chars', 'pojeść', 'poj'],
      ['should remove "aść" from verb > 5 chars', 'podkraść', 'podkr'],
      ['should remove "łem" from verb > 5 chars', 'zrobiłem', 'zrobi'],
      ['should remove "amy" from verb > 5 chars', 'kochamy', 'koch'],
      ['should remove "emy" from verb > 5 chars', 'ugotujemy', 'ugotuj'],
      
      ['should remove "esz" from verb > 3 and <= 5 chars', 'zjesz', 'zje'],
      ['should remove "asz" from verb > 3 and <= 5 chars', 'masz', 'ma'],
      ['should remove "eść" from verb > 3 and <= 5 chars', 'jeść', 'je'],
      ['should remove "aść" from verb > 3 and <= 5 chars', 'kraść', 'kra'],
      ['should remove "eć" from verb > 3 and <= 5 chars', 'mieć', 'mi'],
      ['should remove "ać" from verb > 3 and <= 5 chars', 'brać', 'br'],

      ['should remove "aj" from verb > 3 and <= 5 chars', 'dawaj', 'dawa'],

      ['should remove "ać" from verb > 3 chars', 'gotować', 'gotow'],
      ['should remove "em" from verb > 3 chars', 'zjem', 'zj'],
      ['should remove "am" from verb > 3 chars', 'zjadam', 'zjad'],
      ['should remove "ał" from verb > 3 chars', 'gotował', 'gotow'],
      ['should remove "ił" from verb > 3 chars', 'zrobił', 'zrob'],
      ['should remove "ić" from verb > 3 chars', 'zrobić', 'zrob'],
      ['should remove "ąc" from verb > 3 chars', 'będąc', 'będ'],

    ]

    for (const [description, fullWord, expectedWord] of testCases) {
      it(description, function () {
        expectWord(fullWord, expectedWord)
      })
    }
  })

  describe('adverb suffix removal', function () {
    const expectWord = (fullWord, expectedWord) => expect(removeAdverbsEnds(fullWord)).to.equal(expectedWord)

    const testCases = [     
      ['should remove "ie" from adverb > 4 chars ending with "nie"', 'grzecznie', 'grzeczn'],
      ['should remove "ie" from adverb > 4 chars ending with "wie"', 'ckliwie', 'ckliw'],
      
      ['should remove "ze" from adverb > 4 chars ending with "rze"', 'dobrze', 'dobr'],
    ]

    for (const [description, fullWord, expectedWord] of testCases) {
      it(description, function () {
        expectWord(fullWord, expectedWord)
      })
    }
  })

  describe('plural forms removal', function () {
    const expectWord = (fullWord, expectedWord) => expect(removePluralForms(fullWord)).to.equal(expectedWord)

    const testCases = [     
      ['should remove "ów" from plural nouns > 4 chars', 'chłopców', 'chłopc'],      
      ['should remove "om" from plural nouns > 4 chars', 'chłopcom', 'chłopc'],   

      ['should remove "ami" from plural nouns > 4 chars', 'chłopcami', 'chłopc'],      
    ]

    for (const [description, fullWord, expectedWord] of testCases) {
      it(description, function () {
        expectWord(fullWord, expectedWord)
      })
    }
  })

  describe('general suffixes removal', function () {
    const expectWord = (fullWord, expectedWord) => expect(removeGeneralSuffixes(fullWord)).to.equal(expectedWord)

    const testCases = [     
      ['should remove "ia" from words > 4 chars', 'brania', 'bran'],      
      ['should remove "ie" from words > 4 chars', 'branie', 'bran'],   

      ['should remove "u" from words > 4 chars', 'trudu', 'trud'],      
      ['should remove "ą" from words > 4 chars', 'gwardią', 'gwardi'],      
      ['should remove "i" from words > 4 chars', 'fajni', 'fajn'],      
      ['should remove "a" from words > 4 chars', 'fajna', 'fajn'],      
      ['should remove "ę" from words > 4 chars', 'biorę', 'bior'],      
      ['should remove "y" from words > 4 chars', 'lubiły', 'lubił'],      
      ['should remove "ł" from words > 4 chars', 'pobił', 'pobi'],      
    ]

    for (const [description, fullWord, expectedWord] of testCases) {
      it(description, function () {
        expectWord(fullWord, expectedWord)
      })
    }
  })

  describe('tools', function () {
    describe('ends with any of the provided suffixes', function() {
      it('should return true if word suffix is in provided list', function () {
        expect(endsWithAny("paulina", ["na"])).to.equal(true)
      })
  
      it('should return false if word suffix is not in provided list', function () {
        expect(endsWithAny("paulina", ["foo"])).to.equal(false)
      })
  
      it('should return false if provided list is empty', function () {
        expect(endsWithAny("paulina", [])).to.equal(false)
      })
  
      it('should return false if provided word is empty', function () {
        expect(endsWithAny("", ["foo", "foo2"])).to.equal(false)
      })
    })
    
    describe('word is longer than provided number', function () {
      it('should return true for word with length longer than provided value', function () {
        expect(isLongerThan("paulina", 2)).to.equal(true)
      })
  
      it('should return false for word with length longer equal to provided value', function () {
        expect(isLongerThan("paulina", 7)).to.equal(false)
      })
  
      it('should return false for word with length longer than provided value', function () {
        expect(isLongerThan("paulina", 10)).to.equal(false)
      })
    })

    describe('remove suffix', function () {
      it('should remove nothing if the length of suffix is 0', function () {
        expect(removeSuffix("paulina", 0)).to.equal("paulina")
      })

      it('should return empty string if the length of suffix is longer than word', function () {
        expect(removeSuffix("paulina", 10)).to.equal("")
      })

      it('should remove correct number of chars from the ending', function () {
        expect(removeSuffix("paulina", 3)).to.equal("paul")
      })

      it('should return empty string if the word was empty', function () {
        expect(removeSuffix("", 3)).to.equal("")
      })

      it('should return the same string if provided number was negative', function () {
        expect(removeSuffix("paulina", -3)).to.equal("paulina")
      })
    })
    
    describe('remove prefix', function () {
      it('should remove nothing if the length of prefix is 0', function () {
        expect(removePrefix("paulina", 0)).to.equal("paulina")
      })
  
      it('should return empty string if the length of prefix is longer than word', function () {
        expect(removePrefix("paulina", 10)).to.equal("")
      })
  
      it('should remove correct number of chars from the begining', function () {
        expect(removePrefix("paulina", 3)).to.equal("lina")
      })
  
      it('should return empty string if the word was empty', function () {
        expect(removePrefix("", 3)).to.equal("")
      })
  
      it('should return the same string if provided number was negative', function () {
        expect(removePrefix("paulina", -3)).to.equal("paulina")
      })
    })
  })
})
