sentry-ts-repro
===============

The purpose is to compile a node+typescript project,
then minify it, and have Sentry errors be trackable via SourceMap(s)

**SPOILER ALERT**: node 10.x produces wrong error col/lines on minified sourcecode (that [should be the issue](https://github.com/nodejs/node/issues/2860)) 
node 12.x on the other hand produces correct ones, as it uses more recent V8.

# Prerequisities

- Be registered on sentry.io
- Have an organization/project with `node.js` ready
- Generate an auth token here: https://sentry.io/settings/account/api/auth-tokens/

**Configure ENV Variables**:  
```shell
export SENTRY_AUTH_TOKEN=<fill this>
export SENTRY_ORG=<fill this>
export SENTRY_PROJECT=<fill this>
export SENTRY_DSN=<fill this>
```

### Build project
Clone this, then:
```shell
./build.sh build
node build/app.js
```

### Build project minified
Clone this, then:
```shell
./build.sh minified
node minified/app.js
```

## Finding the source line/column
Edit `source-map.js` and provide correct line/column values then `node source-map.js`

**What to expect:**
```
{
  source: '/src/lib.ts',
  line: 4,
  column: 30,
  name: null
}
```

### Additional useful commands
Delete release files in between tries:
```
./clean-release.sh
```
