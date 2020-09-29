export type FontWeight = 'normal' | 'bold' | 'bolder' | 'lighter' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

export type FontStyle = 'normal' | 'italic' | 'oblique'

export interface Options {
  extname?: string
  fontFamily?: string
  fontWeight?: FontWeight
  fontStyle?: FontStyle
}
