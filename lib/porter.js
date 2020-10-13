export class Rule {
  constructor (requiredLength, affixes, howManyToRemove) {
    this.requiredLength = requiredLength
    this.affixes = affixes
    this.howManyToRemove = howManyToRemove
  }
}

export function isLongerThan (word, length) {
  return word.length > length
}

export function startsWithAny (word, prefixes) {
  return prefixes.some(prefix => word.startsWith(prefix))
}

export function endsWithAny (word, suffixes) {
  return suffixes.some(suffix => word.endsWith(suffix))
}

export function removePrefix (word, toSlice) {
  if (toSlice < 0) { return word }
  return word.slice(toSlice, word.length)
}

export function removeSuffix (word, toSlice) {
  if (toSlice <= 0) { return word }
  if (toSlice > word.length) { return '' }
  return word.slice(word, -toSlice)
}

export function isSatisfiedPrefix (rule, word) {
  return isLongerThan(word, rule.requiredLength) && startsWithAny(word, rule.affixes)
}

export function isSatisfiedSuffix (rule, word) {
  return isLongerThan(word, rule.requiredLength) && endsWithAny(word, rule.affixes)
}

export function getPrefixToRemoveLength (word, rules) {
  const winRule = rules.find(r => isSatisfiedPrefix(r, word))
  return winRule !== undefined ? winRule.howManyToRemove : 0
}

export function getSuffixToRemoveLength (word, rules) {
  const winRule = rules.find(r => isSatisfiedSuffix(r, word))
  return winRule !== undefined ? winRule.howManyToRemove : 0
}

export function applySuffixRules (rules, word) {
  const suffixLength = getSuffixToRemoveLength(word, rules)
  return removeSuffix(word, suffixLength)
}

export function applyPrefixRules (rules, word) {
  const prefixLength = getPrefixToRemoveLength(word, rules)
  return removePrefix(word, prefixLength)
}
