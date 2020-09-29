const path = require('path')
const Vinyl = require('vinyl')
const css = require('css')
/**
 * Create file object for testing.
 * @param  {String} filepath File path.
 * @param  {String} contents File contents (optional, defaults to empty).
 * @return {Object}          Vinyl instance.
 */
function createFile(filepath, contents = '') {
  return new Vinyl({
    base: path.dirname(filepath),
    path: filepath,
    contents: Buffer.from(contents),
  })
}

/**
 * Get generated @font-face property for testing.
 * @param  {String} styles   Generated stylesheet contents.
 * @param  {String} property Propery name.
 * @return {String}          Property value.
 *
 * ast:     {"type":"stylesheet","stylesheet":{"rules":[{"type":"font-face","declarations":[{"type":"declaration","property":"font-family","value":"\"luichooy-icon\"","position":{"start":{"line":1,"column":12},"end":{"line":1,"column":39}}},{"type":"declaration","property":"font-weight","value":"normal","position":{"start":{"line":1,"column":40},"end":{"line":1,"column":58}}},{"type":"declaration","property":"font-style","value":"normal","position":{"start":{"line":1,"column":59},"end":{"line":1,"column":76}}},{"type":"declaration","property":"src","value":"url(data:font/woff;charset=utf-8;base64,)","position":{"start":{"line":1,"column":77},"end":{"line":1,"column":122}}}],"position":{"start":{"line":1,"column":1},"end":{"line":1,"column":124}}}],"parsingErrors":[]}}
 */
function getProperty(styles, property) {
  const ast = css.parse(styles)
  const { declarations } = ast.stylesheet.rules[0]
  return (declarations.find(declation => declation.property === property) || {}).value
}

module.exports = {
  createFile,
  getProperty,
}
