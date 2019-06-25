sentry-ts-repro
===============

The purpose is to compile a node+typescript project,
then minify it, and have Sentry errors be trackable via SourceMap(s)

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

# How to Reproduce - minified error
Clone this, then:
```shell
./build.sh minified
node minified/app.js
```

# How to Reproduce - non-minified working
Clone this, then:
```shell
./build.sh build
node build/app.js
```

# Additional useful commands
Delete release files in between tries:
```
./clean-release.sh
```
