import { Options } from './types'
const path = require('path')
const through2 = require('through2')
const PluginError = require('plugin-error')
const { getFontFamily, getFontStyle, getFontWeight, getSrc } = require('./util')

/**
 * Convert fonts to stylesheet using Gulp.
 *
 * Encodes font files in Base64 inside a CSS `@font-face` rule.
 *
 */

const DEFAULT_OPTS: Options = {
  extname: '.css',
  fontWeight: 'normal',
  fontStyle: 'normal',
}

function font2style(opts: Options) {
  const options: Options = Object.assign({}, DEFAULT_OPTS, opts)
  return through2.obj(function (file: any, enc: string, callback: Function) {
    if (file.isNull()) {
      this.push(file)
      return callback()
    }

    if (file.isStream()) {
      this.emit(
        'error',
        new PluginError({
          plugin: 'gulp-font2style',
          message: 'Streaming is not supported',
        }),
      )
      return callback()
    }

    if (file.isBuffer()) {
      // extract the value of 'font-family' from file name by default
      if (!options.fontFamily) {
        options.fontFamily = path.basename(file.path, path.extname(file.path))
      }

      const attributes = [
        getFontFamily(options.fontFamily),
        getFontWeight(options.fontWeight),
        getFontStyle(options.fontStyle),
        getSrc(file),
      ]

      const contents: string = `@font-face{${attributes.join('')}}`

      file.contents = Buffer.from(contents)
      file.extname = options.extname

      return callback(null, file)
    }
  })
}

module.exports = font2style
