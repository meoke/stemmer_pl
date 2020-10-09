const getStem = (word) => {
  if (typeof word !== 'string' || word === '') {
    return ''
  }
  let stem = word.toLowerCase()
  stem = removeNouns(stem)
  stem = removeDiminutive(stem)
  stem = removeAdjectiveEnds(stem)
  stem = removeVerbsEnds(stem)
  stem = removeAdverbsEnds(stem)
  stem = removePluralForms(stem)
  stem = removeGeneralSuffixes(stem)

  return stem
}

const removeSuffix = (word, toSlice) => {
  if (toSlice <= 0) { return word }
  if (toSlice > word.length) { return '' }
  return word.slice(0, -toSlice)
}

const removePrefix = (word, toSlice) => {
  return word.slice(toSlice, 0)
}

const isLongerThan = (word, length) => {
  return word.length > length
}

const endsWithAny = (word, suffixes) => {
  return suffixes.some(suffix => word.endsWith(suffix))
}

const removeNouns = (word) => {
  if (isLongerThan(word, 7) && endsWithAny(word, ['zacja', 'zacją', 'zacji'])) {
    return removeSuffix(word, 4)
  }
  // todo "ania"?
  if (isLongerThan(word, 6) && ['acja', 'acji', 'acją', 'tach', 'anie', 'enie', 'eniu', 'aniu'].includes(word.slice(-4))) {
    return word.slice(0, -4)
  }
  if (isLongerThan(word, 6) && word.slice(-4) === 'tyka') {
    return word.slice(0, -2)
  }
  if (isLongerThan(word, 5) && ['ach', 'ami', 'nia', 'niu', 'cia', 'ciu'].includes(word.slice(-3))) {
    return word.slice(0, -3)
  }
  if (isLongerThan(word, 5) && ['cji', 'cja', 'cją'].includes(word.slice(-3))) {
    return word.slice(0, -2)
  }
  if (isLongerThan(word, 5) && ['ce', 'ta'].includes(word.slice(-2))) {
    return word.slice(0, -2)
  }
  return word
}

const removeDiminutive = (word) => {
  if (isLongerThan(word, 6)) { // todo eczka, iczka, aszka, uszka, iszka?
    if (['eczek', 'iczek', 'iszek', 'aszek', 'uszek'].includes(word.slice(-5))) {
      return word.slice(0, -5)
    }
    if (['enek', 'ejek', 'erek'].includes(word.slice(-4))) {
      return word.slice(0, -2)
    }
  }
  if (isLongerThan(word, 4) && ['ek', 'ak'].includes(word.slice(-2))) {
    return word.slice(0, -2)
  }
  return word
}

const removeAdjectiveEnds = (word) => {
  if (isLongerThan(word, 7) && word.startsWith('naj') && (word.endsWith('sze') || word.endsWith('szy'))) {
    return word.slice(3, -3) // todo szą?
  }
  if (isLongerThan(word, 7) && word.startsWith('naj') && word.endsWith('szych')) {
    return word.slice(3, -5)
  }
  if (isLongerThan(word, 6) && word.endsWith('czny')) {
    return word.slice(0, -4)
  }
  if (isLongerThan(word, 5) && ['owy', 'owa', 'owe', 'ych', 'ego'].includes(word.slice(-3))) {
    return word.slice(0, -3)
  }
  if (isLongerThan(word, 5) && word.endsWith('ej')) {
    return word.slice(0, -2)
  }
  return word
}

const removeVerbsEnds = (word) => {
  // łam?
  if (isLongerThan(word, 5) && word.endsWith('bym')) {
    return word.slice(0, -3)
  }
  if (isLongerThan(word, 5) && ['esz', 'asz', 'cie', 'eść', 'aść', 'łem', 'amy', 'emy'].includes(word.slice(-3))) {
    return word.slice(0, -3)
  }
  if (isLongerThan(word, 3) && ['esz', 'asz', 'eść', 'aść'].includes(word.slice(-3))) {
    return word.slice(0, -2)
  }
  if (isLongerThan(word, 3) && ['eć', 'ać'].includes(word.slice(-2))) {
    return word.slice(0, -2)
  }
  if (isLongerThan(word, 3) && word.endsWith('aj')) {
    return word.slice(0, -1)
  }
  if (isLongerThan(word, 3) && ['ać', 'em', 'am', 'ał', 'ił', 'ić', 'ąc'].includes(word.slice(-2))) {
    return word.slice(0, -2)
  }
  return word
}

const removeAdverbsEnds = (word) => {
  if (isLongerThan(word, 4) && (word.endsWith('nie') || word.endsWith('wie'))) {
    return word.slice(0, -2)
  }
  if (isLongerThan(word, 4) && word.endsWith('rze')) {
    return word.slice(0, -2)
  }
  return word
}

const removePluralForms = (word) => {
  if (isLongerThan(word, 4) && (word.endsWith('ów') || word.endsWith('om'))) {
    return word.slice(0, -2)
  }
  if (isLongerThan(word, 4) && word.endsWith('ami')) {
    return word.slice(0, -3)
  }
  return word
}

const removeGeneralSuffixes = (word) => {
  if (isLongerThan(word, 4) && (word.endsWith('ia') || word.endsWith('ie'))) {
    return word.slice(0, -2)
  }
  if (isLongerThan(word, 4) && ['u', 'ą', 'i', 'a', 'ę', 'y', 'ę', 'ł'].includes(word.slice(-1))) {
    return word.slice(0, -1)
  }
  return word
}

export { removeSuffix, removePrefix, getStem, removeNouns, removeDiminutive, removeAdjectiveEnds, removeVerbsEnds, removeAdverbsEnds, removePluralForms, removeGeneralSuffixes, endsWithAny, isLongerThan }
export default getStem
