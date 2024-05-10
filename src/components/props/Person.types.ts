// Puedo tener los tipos en un archivo separado para organizar mejor

export type Name = {
  first: string
  last: string
}
export type PersonProps = { 
  name: Name // Podría organizarlo de esta manera para reusarlo en distintos lugares
}
