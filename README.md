[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/benadamstyles/benadamstyles)

# Ben Styles

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

### start

```sh
react-static start
```

### stage

```sh
react-static build --staging
```

### build

```sh
react-static build
```

### serve

```sh
serve dist -p 3001
```
