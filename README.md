

# stemmer_pl


[![Test suite](https://github.com/meoke/stemmer_pl/workflows/Test%20suite/badge.svg)](https://github.com/meoke/stemmer_pl/workflows/Test%20suite/badge.svg)
[![Build Status](https://travis-ci.org/meoke/stemmer_pl.svg?branch=master)](https://travis-ci.org/meoke/stemmer_pl.svg?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)

Stemmer for Polish language, based on Porter's algorithm.


It's not perfect, as I do not have background in linguistics, but I hope it's good enough. It is solely based on this [python implementation](https://github.com/Tutanchamon/pl_stemmer).

## About this package

This package provides a simple stemmer for Polish language. For provided word it extracts its stem by cutting off its affixes (prefixes and suffixes).

For example:

- fajni -> fajn
- chłopców -> chłopc
- grzecznie -> grzeczn
- najlepszy -> lep 


## Installation

```
npm install stemmer_pl
```

## API
 
### getStem(word: string) -> string

Return stem for given word. If no affixes were cut off it returns the same word.

## Usage

```
import getStem from 'stemmer_pl'

const stem = getStem('fajni')
console.log(stem) // expected output: fajn
```

## License

MIT, see [license file](LICENSE)
