import { describe, it } from 'mocha'
import { expect } from 'chai'

var rewire = require("rewire");
var stemmer = rewire('../lib/stemmer.js');

const getStem = stemmer.__get__('getStem')
const removeNounAffix = stemmer.__get__('removeNounAffix')
const removeDiminutiveAffix = stemmer.__get__('removeDiminutiveAffix')
const removeAdjectiveAffix = stemmer.__get__('removeAdjectiveAffix')
const removeVerbAffix = stemmer.__get__('removeVerbAffix')
const removeAdverbAffix = stemmer.__get__('removeAdverbAffix')
const removePluralFormAffix = stemmer.__get__('removePluralFormAffix')
const removeGeneralAffix = stemmer.__get__('removeGeneralAffix')

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
    ['zorganizowane', 'zorganizow'],
    ['z', 'z'],
    ['myślą', 'myśl'],
    ['o', 'o'],
    ['studentach', 'studen'],
    ['i', 'i'],
    ['absolwentach', 'absolwen'],
    ['znających', 'znaj'],
    ['języki', 'język'],
    ['obce', 'obc'],
    ['na', 'na'],
    ['poziomie', 'poziom'],
    ['co', 'co'],
    ['najmniej', 'mniej'],
    ['Będą', 'będ'],
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
    ['wykorzystania', 'wykorzyst'],
    ['swoich', 'swoich'],
    ['umiejętności', 'umiejętnoś'],
    ['lingwistycznych', 'lingwistyczn'],
    ['na', 'na'],
    ['współczesnym', 'współczesn'],
    ['rynku', 'rynk'],
    ['pracy', 'prac'],
    ['dlatego', 'dlat'],
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
    const expectWord = (fullWord, withoutSuffix) => expect(removeNounAffix(fullWord)).to.equal(withoutSuffix)

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
    const expectWord = (fullWord, withoutSuffix) => expect(removeDiminutiveAffix(fullWord)).to.equal(withoutSuffix)

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
    const expectWord = (fullWord, expectedWord) => expect(removeAdjectiveAffix(fullWord)).to.equal(expectedWord)

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

      ['should remove "ej" from adjective > 5 chars', 'stołecznej', 'stołeczn'],

      ['should remove "ym" from adjective > 5 chars', 'biernym', 'biern']
    ]

    for (const [description, fullWord, expectedWord] of testCases) {
      it(description, function () {
        expectWord(fullWord, expectedWord)
      })
    }
  })

  describe('verb suffix removal', function () {
    const expectWord = (fullWord, expectedWord) => expect(removeVerbAffix(fullWord)).to.equal(expectedWord)

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

      ['should replace "eli" with "eć" in verb > 4', 'powiedzieli', 'powiedzie'],
    ]

    for (const [description, fullWord, expectedWord] of testCases) {
      it(description, function () {
        expectWord(fullWord, expectedWord)
      })
    }
  })

  describe('adverb suffix removal', function () {
    const expectWord = (fullWord, expectedWord) => expect(removeAdverbAffix(fullWord)).to.equal(expectedWord)

    const testCases = [     
      ['should remove "ie" from adverb > 4 chars ending with "nie"', 'grzecznie', 'grzeczn'],
      ['should remove "ie" from adverb > 4 chars ending with "wie"', 'ckliwie', 'ckliw'],
      
      ['should remove "ze" from adverb > 4 chars ending with "rze"', 'dobrze', 'dobr'],

      ['should replace "ane" with "ać" in adverb > 4 chars ending with "ane"', 'namalowane', 'namalowa']
    ]

    for (const [description, fullWord, expectedWord] of testCases) {
      it(description, function () {
        expectWord(fullWord, expectedWord)
      })
    }
  })

  describe('plural forms removal', function () {
    const expectWord = (fullWord, expectedWord) => expect(removePluralFormAffix(fullWord)).to.equal(expectedWord)

    const testCases = [     
      ['should remove "ów" from plural nouns > 4 chars', 'chłopców', 'chłopc'],      
      ['should remove "om" from plural nouns > 4 chars', 'chłopcom', 'chłopc'],   

      ['should remove "ami" from plural nouns > 4 chars', 'chłopcami', 'chłopc'],
      
      ['should remove "ci" from plural nouns > 4 chars ending with "ści"', 'gości', 'goś'],
    ]

    for (const [description, fullWord, expectedWord] of testCases) {
      it(description, function () {
        expectWord(fullWord, expectedWord)
      })
    }
  })

  describe('general suffixes removal', function () {
    const expectWord = (fullWord, expectedWord) => expect(removeGeneralAffix(fullWord)).to.equal(expectedWord)

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

  
})
