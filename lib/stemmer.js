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
  return word.slice(word, -toSlice)
}

const removePrefix = (word, toSlice) => {
  if (toSlice < 0) { return word }
  return word.slice(toSlice, word.length)
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
  if (isLongerThan(word, 6) && endsWithAny(word, ['acja', 'acji', 'acją', 'tach', 'anie', 'enie', 'eniu', 'aniu'])) {
    return removeSuffix(word, 4)
  }
  if (isLongerThan(word, 6) && endsWithAny(word, ['tyka'])) {
    return removeSuffix(word, 2)
  }
  if (isLongerThan(word, 5) && endsWithAny(word, ['ach', 'ami', 'nia', 'niu', 'cia', 'ciu'])) {
    return removeSuffix(word, 3)
  }
  if (isLongerThan(word, 5) && endsWithAny(word, ['cji', 'cja', 'cją'])) {
    return removeSuffix(word, 2)
  }
  if (isLongerThan(word, 5) && endsWithAny(word, ['ce', 'ta'])) {
    return removeSuffix(word, 2)
  }
  return word
}

const removeDiminutive = (word) => {
  if (isLongerThan(word, 6)) { // todo eczka, iczka, aszka, uszka, iszka?
    if (endsWithAny(word, ['eczek', 'iczek', 'iszek', 'aszek', 'uszek'])) {
      return removeSuffix(word, 5)
    }
    if (endsWithAny(word, ['enek', 'ejek', 'erek'])) {
      return removeSuffix(word, 2)
    }
  }
  if (isLongerThan(word, 4) && endsWithAny(word, ['ek', 'ak'])) {
    return removeSuffix(word, 2)
  }
  return word
}

const removeAdjectiveEnds = (word) => {
  if (word.startsWith('naj')) {
    word = removePrefix(word, 3)
  }
  if (isLongerThan(word, 4) && (word.endsWith('sze') || word.endsWith('szy'))) {
    return removeSuffix(word, 3) // todo szą?
  }
  if (isLongerThan(word, 4) && word.endsWith('szych')) {
    return removeSuffix(word, 5)
  }
  if (isLongerThan(word, 6) && word.endsWith('czny')) {
    return removeSuffix(word, 4)
  }
  if (isLongerThan(word, 5) && endsWithAny(word, ['owy', 'owa', 'owe', 'ych', 'ego'])) {
    return removeSuffix(word, 3)
  }
  if (isLongerThan(word, 5) && word.endsWith('ej')) {
    return removeSuffix(word, 2)
  }
  if (isLongerThan(word, 5) && word.endsWith('nym')) {
    return removeSuffix(word, 2)
  }
  return word
}

const removeVerbsEnds = (word) => {
  // łam?
  if (isLongerThan(word, 5) && word.endsWith('bym')) {
    return removeSuffix(word, 3)
  }
  if (isLongerThan(word, 5) && endsWithAny(word, ['esz', 'asz', 'cie', 'eść', 'aść', 'łem', 'amy', 'emy'])) {
    return removeSuffix(word, 3)
  }
  if (isLongerThan(word, 3) && endsWithAny(word, ['esz', 'asz', 'eść', 'aść'])) {
    return removeSuffix(word, 2)
  }
  if (isLongerThan(word, 3) && endsWithAny(word, ['eć', 'ać'])) {
    return removeSuffix(word, 2)
  }
  if (isLongerThan(word, 3) && word.endsWith('aj')) {
    return removeSuffix(word, 1)
  }
  if (isLongerThan(word, 3) && endsWithAny(word, ['ać', 'em', 'am', 'ał', 'ił', 'ić', 'ąc'])) {
    return removeSuffix(word, 2)
  }
  if (isLongerThan(word, 4) && word.endsWith('eli')) {
    return removeSuffix(word, 2) + 'ć'
  }
  return word
}

const removeAdverbsEnds = (word) => {
  if (isLongerThan(word, 4) && (word.endsWith('nie') || word.endsWith('wie'))) {
    return removeSuffix(word, 2)
  }
  if (isLongerThan(word, 4) && word.endsWith('ane')) {
    return removeSuffix(word, 2) + 'ć'
  }
  if (isLongerThan(word, 4) && word.endsWith('rze')) {
    return removeSuffix(word, 2)
  }
  return word
}

const removePluralForms = (word) => {
  if (isLongerThan(word, 4) && (word.endsWith('ów') || word.endsWith('om'))) {
    return removeSuffix(word, 2)
  }
  if (isLongerThan(word, 4) && word.endsWith('ami')) {
    return removeSuffix(word, 3)
  }
  if (isLongerThan(word, 4) && word.endsWith('ści')) {
    return removeSuffix(word, 2)
  }
  return word
}

const removeGeneralSuffixes = (word) => {
  if (isLongerThan(word, 4) && (word.endsWith('ia') || word.endsWith('ie'))) {
    return removeSuffix(word, 2)
  }
  if (isLongerThan(word, 3) && endsWithAny(word, ['u', 'e', 'ą', 'i', 'a', 'y', 'ę', 'ł'])) {
    return removeSuffix(word, 1)
  }
  return word
}

export default getStem
