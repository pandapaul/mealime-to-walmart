const test = require('ava')
const fs = require('fs-extra')
const Promise = require('bluebird')
const path = require('path')

const sourceDirectories = [
  'lib'
]

function getFilenames(dir) {
  return fs.readdir(dir)
}

function getPaths(dir, filenames) {
  return filenames.map(filename => path.join(dir, filename))
}

function getTestFromFile(filePath) {
  const mod = require(path.join(__dirname, filePath))
  return {
    path: filePath,
    test: mod.path
  }
}

function getModulesForDir(dir) {
  return getFilenames(dir)
    .then(filenames => getPaths(dir, filenames))
    .then(paths => Promise.map(paths, getTestFromFile))
}

function flatten(tests) {
  console.log('flattening ', tests)
  return tests.reduce((agg, dirTests) => {
    agg = agg.concat(dirTests)
    return agg
  }, [])
}

function getModules() {
  return Promise.map(sourceDirectories, getModulesForDir)
    .then(flatten)
}



test('every module should have a test', async t => {
  const mods = await getModules()
  t.plan(mods.length)
  mods.forEach(mod => {
    t.assert(mod.test, `${mod.path} does not have a test`)
  })
})

