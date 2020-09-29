interface PrintFn {
  (msg: string): void
}

const greet: PrintFn = (msg: string) => {
  console.log(msg)
}

greet('hello ts')
