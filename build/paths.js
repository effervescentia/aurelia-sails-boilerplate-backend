var appRoot = 'src/';
var outputRoot = 'api/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.ts',
  output: outputRoot,
  doc: './doc',
  dtsSrc: ['./typings/**/*.d.ts']
}
