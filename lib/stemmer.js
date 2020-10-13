import { Rule, applyPrefixRules, applySuffixRules } from './porter.js'

export default function getStem (word) {
  if (typeof word !== 'string' || word === '') {
    return ''
  }

  let stem = word.toLowerCase()
  stem = removeNounAffix(stem)
  stem = removeDiminutiveAffix(stem)
  stem = removeAdjectiveAffix(stem)
  stem = removeVerbAffix(stem)
  stem = removeAdverbAffix(stem)
  stem = removePluralFormAffix(stem)
  stem = removeGeneralAffix(stem)
  return stem
}

const removeNounAffix = (word) => {
  const rules = [
    new Rule(7, ['zacja', 'zacją', 'zacji'], 4),
    new Rule(6, ['acja', 'acji', 'acją', 'tach', 'anie', 'enie', 'eniu', 'aniu'], 4),
    new Rule(6, ['tyka'], 2),
    new Rule(5, ['ach', 'ami', 'nia', 'niu', 'cia', 'ciu'], 3),
    new Rule(5, ['cji', 'cja', 'cją'], 2),
    new Rule(5, ['ce', 'ta'], 2)
  ]

  return applySuffixRules(rules, word)
}

const removeDiminutiveAffix = (word) => {
  const rules = [
    new Rule(6, ['eczek', 'iczek', 'iszek', 'aszek', 'uszek'], 5),
    new Rule(6, ['enek', 'ejek', 'erek'], 2),
    new Rule(4, ['ek', 'ak'], 2)
  ]

  return applySuffixRules(rules, word)
}

const removeAdjectiveAffix = (word) => {
  const prefixRules = [
    new Rule(0, ['naj'], 3)
  ]

  const suffixRules = [
    new Rule(4, ['sze', 'szy'], 3), // szą?
    new Rule(4, ['szych'], 5),
    new Rule(6, ['czny'], 4),
    new Rule(5, ['owy', 'owa', 'owe', 'ych', 'ego'], 3),
    new Rule(5, ['ej'], 2),
    new Rule(5, ['nym'], 2)
  ]
  let stem = applyPrefixRules(prefixRules, word)
  return applySuffixRules(suffixRules, stem)
}

const removeVerbAffix = (word) => {
  const rules = [
    new Rule(5, ['bym'], 3),
    new Rule(5, ['esz', 'asz', 'cie', 'eść', 'aść', 'łem', 'amy', 'emy'], 3),
    new Rule(3, ['esz', 'asz', 'eść', 'aść'], 2),
    new Rule(3, ['eć', 'ać'], 2),
    new Rule(3, ['aj'], 1),
    new Rule(3, ['ać', 'em', 'am', 'ał', 'ił', 'ić', 'ąc'], 2),
    new Rule(4, ['eli'], 2)
  ]

  return applySuffixRules(rules, word)
}

const removeAdverbAffix = (word) => {
  const rules = [
    new Rule(4, ['nie', 'wie'], 2),
    new Rule(4, ['ane'], 2),
    new Rule(4, ['rze'], 2)
  ]

  return applySuffixRules(rules, word)
}

const removePluralFormAffix = (word) => {
  const rules = [
    new Rule(4, ['ów', 'om'], 2),
    new Rule(4, ['ami'], 3),
    new Rule(4, ['ści'], 2)
  ]

  return applySuffixRules(rules, word)
}

const removeGeneralAffix = (word) => {
  const rules = [
    new Rule(4, ['ia', 'ie'], 2),
    new Rule(3, ['u', 'e', 'ą', 'i', 'a', 'y', 'ę', 'ł'], 1)
  ]

  return applySuffixRules(rules, word)
}
