import { RewriteFrames } from '@sentry/integrations'
import * as Sentry from '@sentry/node'
import { join, relative } from 'path'

import pkg from '../package.json'

const SENTRY_DSN = process.env.SENTRY_DSN

const ROOTDIR = join(__dirname, '..')
const nodeModulesPath = join(ROOTDIR, 'node_modules')

if (SENTRY_DSN != null) {
  Sentry.init({
    release: pkg.version,
    dsn: SENTRY_DSN,
    integrations: [new RewriteFrames({
      iteratee: (frame) => {
        // do not alter node_modules stack traces
        if (frame.filename!.startsWith(nodeModulesPath)) return frame
        if (frame.filename!.startsWith('internal')) return frame

        // replace ROOTDIR with app:///
        const relPath = relative(ROOTDIR, frame.filename!).replace(/\\/g, '/')
        frame.filename = `app:///${relPath}`
        return frame
      }
    })]
  })
}
