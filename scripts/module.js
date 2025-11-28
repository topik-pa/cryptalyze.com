/* export */const moduleVariable = 555

/* export */function moduleFunc () {
  console.log('modulFunc')
}

export default function defaultFunc () {
  console.log('defaultFunc')
}

export { moduleVariable, moduleFunc }
