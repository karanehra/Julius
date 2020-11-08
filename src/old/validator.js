export default class Validator {
  string = ''
  isValid = true
  constructor(string) {
    this.string = string
  }

  purelyNumeric() {
    this.isValid = this.isValid && /^[0-9]+$/.test(this.string)
    return this
  }

  email() {
    this.isValid =
      this.isValid && /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi.test(this.string)
    return this
  }

  required() {
    this.isValid = this.isValid && ![undefined, null, ''].includes(this.string)
    return this
  }
}
