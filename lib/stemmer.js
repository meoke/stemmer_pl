const getStem = (word) => {
  if (typeof word !== 'string' || word === '') {
    return ''
  }
  let stem = word.toLowerCase()
  stem = removeNouns(stem)
  stem = removeDiminutive(stem)
  stem = removeAdjectiveEnds(stem)
  stem = removeVerbsEnds(stem)
  // stem = remove_adverbs_ends(stem)
  // stem = remove_plural_forms(stem)
  // stem = remove_general_ends(stem)

  return stem
}

const removeNouns = (word) => {
  if (word.length > 7 && ['zacja', 'zacją', 'zacji'].includes(word.slice(-5))) {
    return word.slice(0, -4)
  }
  // todo "ania"?
  if (word.length > 6 && ['acja', 'acji', 'acją', 'tach', 'anie', 'enie', 'eniu', 'aniu'].includes(word.slice(-4))) {
    return word.slice(0, -4)
  }
  if (word.length > 6 && word.slice(-4) === 'tyka') {
    return word.slice(0, -2)
  }
  if (word.length > 5 && ['ach', 'ami', 'nia', 'niu', 'cia', 'ciu'].includes(word.slice(-3))) {
    return word.slice(0, -3)
  }
  if (word.length > 5 && ['cji', 'cja', 'cją'].includes(word.slice(-3))) {
    return word.slice(0, -2)
  }
  if (word.length > 5 && ['ce', 'ta'].includes(word.slice(-2))) {
    return word.slice(0, -2)
  }
  return word
}

const removeDiminutive = (word) => {
  if (word.length > 6){ //todo eczka, iczka, aszka, uszka, iszka?
    if (['eczek', 'iczek', 'iszek', 'aszek', 'uszek'].includes(word.slice(-5))){
      return word.slice(0, -5)
    }
    if (["enek", "ejek", "erek"].includes(word.slice(-4))){
      return word.slice(0, -2)
    }
  }
  if (word.length > 4 && ['ek', 'ak'].includes(word.slice(-2))) {
    return word.slice(0, -2)
  }
  return word
}

const removeAdjectiveEnds = (word) => {
  if (word.length > 7 &&  word.startsWith("naj") && (word.endsWith("sze") || word.endsWith("szy"))) {
    return word.slice(3, -3) //todo szą?
  }
  if (word.length > 7 && word.startsWith("naj") && word.endsWith("szych")) {
    return word.slice(3, -5)
  }
  if (word.length > 6 &&  word.endsWith("czny")) {
    return word.slice(0, -4)
  }
  if (word.length > 5 && ["owy", "owa", "owe", "ych", "ego"].includes(word.slice(-3))){
    return word.slice(0, -3)
  }
  if (word.length > 5 && word.endsWith('ej')){
    return word.slice(0, -2)
  }
  return word
}

const removeVerbsEnds = (word) => {
  //łam?
  if (word.length > 5 &&  word.endsWith("bym")) {
    return word.slice(0, -3)
  }
  if (word.length > 5 && ["esz", "asz", "cie", "eść", "aść", "łem", "amy", "emy"].includes(word.slice(-3))){
    return word.slice(0, -3)
  }
  if (word.length > 3 && ["esz", "asz", "eść", "aść"].includes(word.slice(-3))){
    return word.slice(0, -2)
  }
  if (word.length > 3 && ["eć", "ać"].includes(word.slice(-2))){
    return word.slice(0, -2)
  }
  if (word.length > 3 && word.endsWith("aj")) {
    return word.slice(0, -1)
  }
  if (word.length > 3 && ["ać", "em", "am", "ał", "ił", "ić", "ąc"].includes(word.slice(-2))){
    return word.slice(0, -2)
  }
  return word
}
    

// def remove_general_ends(word):
//     #print "DEBUG: END", word[-1:]
//     if len(word) > 4 and word[-2:] in {"ia", "ie"}:
//         return word[:-2]
//     if len(word) > 4 and word[-1:] in {"u", u"ą", "i", "a", u"ę", "y", u"ę", u"ł"}:
//         return word[:-1]
//     return word







// def remove_adverbs_ends(word):
//     if len(word) > 4 and word[:-3] in {"nie", "wie"}:
//         return word[:-2]
//     if len(word) > 4 and word.endswith("rze"):
//         return word[:-2]
//     return word

// def remove_plural_forms(word):
//     if len(word) > 4 and (word.endswith(u"ów") or word.endswith("om")):
//         return word[:-2]
//     if len(word) > 4 and word.endswith("ami"):
//         return word[:-3]
//     return word

export { getStem, removeNouns, removeDiminutive, removeAdjectiveEnds, removeVerbsEnds}
export default getStem
