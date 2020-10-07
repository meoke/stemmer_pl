import { describe, it } from 'mocha'
import { expect } from 'chai'
import { getStem } from '../lib/stemmer'
// import getStem from '../lib/stemmer'

describe('stemmer end to end tests', function () {
  // describe('returns the identical word if the given word is its stem', function() {
  //   const expectIdentical = (word) => expect(getStem(word)).to.equal(word)
  //   const words = ['i', 'o', 'nad', 'też', 'nie']

  //   for (const word of words) {
  //     it(`stem equal to (${word})`, function () {
  //       expectIdentical(word)
  //     })
  //   }
  // })

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

describe('stemmer endings removement', function () {
  describe('remove nouns', function () {
    const expectStem = (word, stem) => expect(getStem(word)).to.equal(stem)
    const words = [['organizacja', 'organiz'],
      ['organizacją', 'organiz'],
      ['organizacji', 'organiz']
    ]

    for (const [word, stem] of words) {
      it(`get correct noun stem (${word} -> ${stem})`, function () {
        expectStem(word, stem)
      })
    }
  })
})
