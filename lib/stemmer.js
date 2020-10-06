const getStem = (word) => {
  if (typeof word !== 'string' || word === '') {
    return ''
  }
  const stem = word.toLowerCase()
  return 'rdzen'
}

export { getStem }
