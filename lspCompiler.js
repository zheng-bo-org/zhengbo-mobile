const fs = require("fs")
const lspApi = require('lsp-api')

lspApi.compileAll(process.cwd() + "/data/api", {
    statSync(path) {
        return fs.statSync(path);
    },
    readFileSync(file, encoding) {
        return fs.readFileSync(file, 'utf-8')
    },
    readdirSync(dir) {
        return fs.readdirSync(dir)
    },
    writeFileSync(file, content, encoding) {
        fs.writeFileSync(file, content, 'utf-8')
    },
    existsSync(path) {
        return fs.existsSync(path)
    }
})