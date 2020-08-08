function getProcessArg(key) {
  const { argv } = process;

  return argv[argv.indexOf(`--${key}`) + 1];
}

module.exports = {
  getProcessArg,
};
