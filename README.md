# Ben Styles

## Development tasks and scripts

<!-- maid-tasks -->

The following tasks can be triggered by running `yarn maid <command>`, where `command` is the title below.

### lint

```sh
eslint . --ext=.js,.ts,.tsx
```

### codegen

```sh
ts-node --files ./src/scripts/codegen.ts
```

### start

Runs task `codegen`

```sh
react-static start
```

### stage

Runs task `codegen`

```sh
react-static build --staging
```

### build

Runs task `codegen`

```sh
react-static build
```

### serve

```sh
serve dist -p 3000
```
