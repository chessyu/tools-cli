const Printer = require('@darkobits/lolcatjs');




function transform( str ){
    return Printer.fromString(str)
}


const methods = {
    transform,

}

module.exports = methods;