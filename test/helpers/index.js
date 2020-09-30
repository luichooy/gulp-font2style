import path from 'path'
import Vinyl from 'vinyl'
import css from 'css'
/**
 * Create file object for testing.
 * @param {string}  filepath File path.
 * @param {string}  contents File contents (optional, defaults to empty).
 * @return           Vinyl instance.
 */
export function createFile(filepath, contents = '') {
  return new Vinyl({
    base: path.dirname(filepath),
    path: filepath,
    contents: Buffer.from(contents),
  })
}

/**
 * Get generated @font-face property for testing.
 * @param {string}  styles   Generated stylesheet contents.
 * @param {string}  property Propery name.
 * @return           Property value.
 *
 * ast:     {"type":"stylesheet","stylesheet":{"rules":[{"type":"font-face","declarations":[{"type":"declaration","property":"font-family","value":"\"luichooy-icon\"","position":{"start":{"line":1,"column":12},"end":{"line":1,"column":39}}},{"type":"declaration","property":"font-weight","value":"normal","position":{"start":{"line":1,"column":40},"end":{"line":1,"column":58}}},{"type":"declaration","property":"font-style","value":"normal","position":{"start":{"line":1,"column":59},"end":{"line":1,"column":76}}},{"type":"declaration","property":"src","value":"url(data:font/woff;charset=utf-8;base64,)","position":{"start":{"line":1,"column":77},"end":{"line":1,"column":122}}}],"position":{"start":{"line":1,"column":1},"end":{"line":1,"column":124}}}],"parsingErrors":[]}}
 */
export function getProperty(styles, property) {
  const ast = css.parse(styles)
  const { declarations } = ast.stylesheet.rules[0]
  return (declarations.find(declation => declation.property === property) || {}).value
}
