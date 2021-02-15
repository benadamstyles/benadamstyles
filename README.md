[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/benadamstyles/benadamstyles)

# Personal Website

[benadamstyles.com](https://www.benadamstyles.com)

## Development tasks and scripts

<!-- maid-tasks -->

The following tasks can be triggered by running `yarn maid <command>`, where `command` is the title below.

### lint

```sh
eslint . --ext=.js,.ts,.tsx --report-unused-disable-directives
```

### typecheck

```sh
tsc
```

### compile

```sh
bsb -make-world -clean-world
```

### clean

```sh
bsb -clean-world
```

### watch

```sh
bsb -make-world -clean-world -w
```

### start

```sh
yarn concurrently \
  -n rescript,static \
  -c white.bgRed,white.bgBlue \
  "yarn maid watch" "react-static start"
```

### stage

Runs task `compile` before this.

```sh
react-static build --staging
```

### build

Runs task `compile` before this.

```sh
react-static build
```

### serve

```sh
serve dist -p 3001
```
