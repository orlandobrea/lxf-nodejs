const assert = require('assert')

// TODO: 
// implement a way to create a prototype chain
// of leopard -> lynx -> cat
// leopard prototype must have ONLY a hiss method
// lynx prototype must have ONLY a purr method
// cat prototype must have ONLY a meow method

class Leopard {
    constructor(p) {  this.p = param;}
    hiss() {console.log(this.p+" hiss")}
}

class Lynx  extends Leopard {
    param = '';
    constructor(param) {  super(param); this.param = param;}
    purr() {console.log(this.param+" prrr")}
}

class Cat extends Lynx {
    param = '';
    constructor(param) {  super(param); this.param = param;}
    meow() {console.log(this.param+" meow")}
} 
function inherit (proto) {
  function ChainLink(){}
  ChainLink.prototype = proto
  return new ChainLink()
}

function LeopardP(param) {
  return {
    hiss: () => console.log(param+' hiss')
  }
}

function LynxP(param) {
  LeopardP.call(this, param)
  return {
    purr: () => console.log(param+' prr')
  }
}

function CatP(param) {
  LynxP.call(this, param)
  return {
    meow: () => console.log(param+' meow'),
    __proto__: LynxP
  }
}

Object.setPrototypeOf(CatP.prototype, LynxP.prototype)
Object.setPrototypeOf(LynxP.prototype, LeopardP.prototype)
CatP.__proto__ = LeopardP


// const felix = new Cat('Felix the cat: ') //TODO replace null with instantiation of a cat
const felix = new CatP('Felix the cat: ') //TODO replace null with instantiation of a cat
debugger
console.log(felix)
console.log(felix.__proto__)
console.log(Object.getPrototypeOf(felix))
felix.meow() // prints Felix the cat: meow
felix.purr() // prints Felix the cat: prrr
felix.hiss() // prints Felix the cat: hsss

// prototype checks, do not remove
const felixProto = Object.getPrototypeOf(felix)
const felixProtoProto = Object.getPrototypeOf(felixProto)
const felixProtoProtoProto = Object.getPrototypeOf(felixProtoProto)

assert(Object.getOwnPropertyNames(felixProto).length, 1)
assert(Object.getOwnPropertyNames(felixProtoProto).length, 1)
assert(Object.getOwnPropertyNames(felixProtoProto).length, 1)
assert(typeof felixProto.meow, 'function')
assert(typeof felixProtoProto.purr, 'function')
assert(typeof felixProtoProtoProto.hiss, 'function')
console.log('prototype checks passed!')
