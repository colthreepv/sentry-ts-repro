import pkg from '../package.json'

export function a() {
  console.log('Release:', pkg.version);
  throw new Error('Error generated')
}
