const fs = require('fs')
const path = require('path')
const test = require('ava')
const font2style = require('../lib')
const { createFile, getProperty } = require('./_helper')

const inputPath = path.join(__dirname, './fixtures/testfont.woff')
const expectedPath = path.join(__dirname, '/fixtures/testfont.css')
// TESTS

test.cb('encodes font files to CSS', t => {
  const input = fs.readFileSync(inputPath, 'utf8')
  const expected = fs.readFileSync(expectedPath, 'utf8')
  t.context.stream = font2style()
  t.context.stream.write(createFile(inputPath, input))

  t.context.stream.on('data', file => {
    t.is(String(file.contents), expected)
    t.end()
  })
})

test.cb('should all property value is default', t => {
  t.context.stream = font2style()
  t.context.stream.write(createFile(inputPath))
  t.context.stream.on('data', file => {
    const contentStr = String(file.contents)

    t.is(getProperty(contentStr, 'font-family'), '"testfont"')
    t.is(getProperty(contentStr, 'font-weight'), 'normal')
    t.is(getProperty(contentStr, 'font-style'), 'normal')
    t.end()
  })
})

test.cb('should font-family be sans-serif', t => {
  t.context.stream = font2style({ fontFamily: 'sans-serif' })
  t.context.stream.write(createFile(inputPath))
  t.context.stream.on('data', file => {
    t.is(getProperty(String(file.contents), 'font-family'), '"sans-serif"')
    t.end()
  })
})

test.cb('should font-weight be 700', t => {
  t.context.stream = font2style({ fontWeight: 700 })
  t.context.stream.write(createFile(inputPath))
  t.context.stream.on('data', file => {
    t.is(getProperty(String(file.contents), 'font-weight'), '700')
    t.end()
  })
})

test.cb('should font-weight be bolder', t => {
  t.context.stream = font2style({ fontWeight: 'bolder' })
  t.context.stream.write(createFile(inputPath))
  t.context.stream.on('data', file => {
    t.is(getProperty(String(file.contents), 'font-weight'), 'bolder')
    t.end()
  })
})

test.cb('should font-style be italic', t => {
  t.context.stream = font2style({ fontStyle: 'italic' })
  t.context.stream.write(createFile(inputPath))
  t.context.stream.on('data', file => {
    t.is(getProperty(String(file.contents), 'font-style'), 'italic')
    t.end()
  })
})
