import { FontStyle, FontWeight } from './types'
import mime from 'mime'

export function getFontFamily(fontFamily: string) {
  return `font-family:"${fontFamily}";`
}

export function getFontWeight(fontWeight: FontWeight) {
  return `font-weight:${fontWeight};`
}

export function getFontStyle(fontStyle: FontStyle) {
  return `font-style:${fontStyle};`
}

/**
 * Convert file contents to a Base64-encoded data: URL.
 * @param  {object} file File object.
 * @return {string}     Base64-encoded contents inside a `data:` URL.
 */
export function getSrc(file: any) {
  const encodedContents = Buffer.from(file.contents).toString('base64')
  return `src:url(data:${mime.getType(file.path)};charset=utf-8;base64,${encodedContents});`
}
