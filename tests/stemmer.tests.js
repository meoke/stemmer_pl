import { describe, it } from 'mocha'
import { expect } from 'chai'
import { getStem, removeNouns, removeDiminutive, removeAdjectiveEnds} from '../lib/stemmer'
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

  // describe('returns correct stems', function() {
  //   const expectEqual = (word, stem) => expect(getStem(word)).to.equal(stem)
  //   const words = [['Kariera', 'karier'],
  //   ['na', 'na'],
  //   ['językach', 'język'],
  //   ['to', 'to'],
  //   ['wydarzenie', 'wydarz'],
  //   ['zorganizowane', 'zorganizowa'],
  //   ['z', 'z'],
  //   ['myślą', 'myśl'],
  //   ['o', 'o'],
  //   ['studentach', 'studen'],
  //   ['i', 'i'],
  //   ['absolwentach', 'absolwen'],
  //   ['znających', 'zna'],
  //   ['języki', 'język'],
  //   ['obce', 'obc'],
  //   ['na', 'na'],
  //   ['poziomie', 'poziom'],
  //   ['co', 'co'],
  //   ['najmniej', 'mniej'],
  //   ['Będą', 'Będ'],
  //   ['oni', 'oni'],
  //   ['mieli', 'mie'],
  //   ['okazję', 'okazj'],
  //   ['zastanowić', 'zastanow'],
  //   ['się', 'się'],
  //   ['nad', 'nad'],
  //   ['kierunkami', 'kierunk'],
  //   ['rozwoju', 'rozwoj'],
  //   ['własnej', 'własn'],
  //   ['kariery', 'karier'],
  //   ['zawodowej', 'zawodow'],
  //   ['w', 'w'],
  //   ['oparciu', 'opar'],
  //   ['o', 'o'],
  //   ['informacje', 'informacj'],
  //   ['na', 'na'],
  //   ['temat', 'temat'],
  //   ['możliwości', 'możliwoś'],
  //   ['wykorzystania', 'wykorzysta'],
  //   ['swoich', 'swoich'],
  //   ['umiejętności', 'umiejętności'],
  //   ['lingwistycznych', 'lingiwistyc'],
  //   ['na', 'na'],
  //   ['współczesnym', 'współczesn'],
  //   ['rynku', 'rynk'],
  //   ['pracy', 'prac'],
  //   ['dlatego', 'dlatego'],
  //   ['też', 'też'],
  //   ['nie', 'nie'],
  //   ['chcę', 'chc'],
  // ];

  //   for (const [word, stem] of words) {
  //     it(`correct stem for (${word} -> ${stem})`, function () {
  //       expectEmpty(word)
  //     })
  //   }
  // })
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
})
