import path from 'path'
import through2 from 'through2'
import PluginError from 'plugin-error'
import { getFontFamily, getFontStyle, getFontWeight, getSrc } from './util'
import { Options } from './types'

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

function font2style(opts: Options = {}) {
  const options: Options = Object.assign({}, DEFAULT_OPTS, opts)

  return through2.obj(function (file, enc, callback) {
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

export default font2style
