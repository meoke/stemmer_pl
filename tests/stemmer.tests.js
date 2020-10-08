import { describe, it } from 'mocha'
import { expect } from 'chai'
import { getStem, removeNouns } from '../lib/stemmer'
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

describe('endings removal', function () {
  describe('noun endings removal', function () {
    const expectWord = (fullWord, cutEnding) => expect(removeNouns(fullWord)).to.equal(cutEnding)

    const testCases = [
      ['should remove "acja" from word > 7 chars', 'organizacja', 'organiz'],
      ['should remove "acją" from word > 7 chars', 'organizacją', 'organiz'],
      ['should remove "acji" from word > 7 chars', 'organizacji', 'organiz'],

      ['should remove "acja" from word > 6 chars', 'kolacja', 'kol'],
      ['should remove "acji" from word > 6 chars', 'kolacji', 'kol'],
      ['should remove "acją" from word > 6 chars', 'kolacją', 'kol'],
      ['should remove "tach" from word > 6 chars', 'absolutach', 'absolu'],
      ['should remove "anie" from word > 6 chars', 'rozebranie', 'rozebr'],
      ['should remove "enie" from word > 6 chars', 'seplenienie', 'sepleni'],
      ['should remove "eniu" from word > 6 chars', 'seplenieniu', 'sepleni'],
      ['should remove "aniu" from word > 6 chars', 'rozebraniu', 'rozebr'],

      ['should remove "ka" from word > 6 chars with ending "tyka"', 'matematyka', 'matematy'],

      ['should remove "ach" from word > 5 chars', 'postrach', 'postr'],
      ['should remove "ami" from word > 5 chars', 'postrachami', 'postrach'],
      ['should remove "nia" from word > 5 chars', 'ogłuszania', 'ogłusza'],
      ['should remove "niu" from word > 5 chars', 'fooniu', 'foo'],
      ['should remove "cia" from word > 5 chars', 'pobicia', 'pobi'],
      ['should remove "ciu" from word > 5 chars', 'pobiciu', 'pobi'],

      ['should remove "cji" from word > 5 chars', 'gracji', 'grac'],
      ['should remove "cja" from word > 5 chars', 'gracja', 'grac'],
      ['should remove "cją" from word > 5 chars', 'gracją', 'grac'],

      ['should remove "ce" from word > 5 chars', 'manowce', 'manow'],
      ['should remove "ta" from word > 5 chars', 'ochota', 'ocho']
    ]

    for (const [description, fullWord, cutEnding] of testCases) {
      it(description, function () {
        expectWord(fullWord, cutEnding)
      })
    }
  })
})
