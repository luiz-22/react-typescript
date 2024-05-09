<h1 align="center">React - TypeScript</h1>

## Temas

- Crear un proyecto con Vite
- Props básico
- Props avanzado
- Eventos como props

### Crear un proyecto con Vite

```bash
npm create vite@latest my-react-app -- --template react-ts
```

`App.tsx`

```ts
import { Greet } from './components/props/Greet'
import { Person } from './components/props/Person'
import { PersonList } from './components/props/PersonList'
import { Status } from './components/props/Status'
import { Heading } from './components/props/Heading'
import { Oscar } from './components/props/Oscar'
import { Button } from './components/props/Button'
import { Input } from './components/props/Input'
import { Container } from './components/props/Container'

function App() {
  const personName = {
    first: 'Bruce',
    last: 'Wayne'
  }

  const nameList = [
    {
      first: 'Bruce',
      last: 'Wayne'
    },
    {
      first: 'Clark',
      last: 'Kent'
    },
    {
      first: 'Princess',
      last: 'Diana'
    }
  ]

  return (
    <>
      <Greet name='Vishwas' isLoggedIn={false} />
      <Person name={personName} />
      <PersonList names={nameList} />
      <Status status='loading' />
      <Heading>Placeholder text</Heading>
      <Oscar>
        <Heading>Oscar goes to Dicaprio</Heading>
      </Oscar>
      <Button
        handleClick={(event, id) => {
          console.log('Button clicked', event, id)
        }}
      />
      <Input value='' handleChange={event => console.log(event)} />
      <Container styles={{ border: '1px solid black', padding: '1rem' }} />
    </>
  )
}

export default App
```

### Props básico

`Greet.tsx`

```ts
// Se sugiere usar types para aplicaciones e interfaces para bibliotecas. Aunque es un poco indistinto.

type GreetProps = { // Especificamos el tipo de props
  name: string
  messageCount?: number // Tipo opcional, puede ser que una propiedad pueda no ser pasada
  isLoggedIn: boolean
}

export const Greet = (props: GreetProps) => { // Necesitamos informale el tipo de props a TS
  const { messageCount = 0 } = props // Le asigno un valor por defecto por si no viene la propiedad
  return (
    <div>
      {props.isLoggedIn ? (
        <h2>
          Hey {props.name}! You have {messageCount} unread messages
        </h2>
      ) : (
        <h2>Welcome Guest</h2>
      )}
    </div>
  )
}
```

`Person.types.ts`

```ts
export type Name = {
  first: string
  last: string
}
export type PersonProps = {
  name: Name
}
```

`Person.tsx`

```ts
import { PersonProps } from './Person.types'

export const Person = (props: PersonProps) => {
  return (
    <h2>
      {props.name.first} {props.name.last}
    </h2>
  )
}
```

`PersonList.tsx`

```ts
import { Name } from './Person.types'

type PersonListProps = {
  names: Name[]
}

export const PersonList = (props: PersonListProps) => {
  return (
    <div>
      {props.names.map(name => {
        return (
          <h2 key={name.first}>
            {name.first} {name.last}
          </h2>
        )
      })}
    </div>
  )
}
```

### Props avanzado

`Status.tsx`

```ts
type StatusProps = {
  status: 'loading' | 'success' | 'error' // unión de strings como tipo status
}

export const Status = (props: StatusProps) => {
  let message
  if (props.status === 'loading') {
    message = 'Loading...'
  } else if (props.status === 'success') {
    message = 'Data fetched successfully!'
  } else if (props.status === 'error') {
    message = 'Error fetching data'
  }
  return <h2>Status - {message}</h2>
}
```

`Heading.tsx`

```ts
type HeadingProps = {
  children: string // children prop
}

export const Heading = (props: HeadingProps) => {
  return <h2>{props.children}</h2>
}
```

`Oscar.tsx`

```ts
type OscarProps = {
  children: React.ReactNode // Componente de React como children prop
}

export const Oscar = (props: OscarProps) => {
  return <div>{props.children}</div>
}
```

### Eventos como props

`Button.tsx`

```ts
type ButtonProps = {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>, id: number) => void
}

export const Button = (props: ButtonProps) => {
  return <button onClick={event => props.handleClick(event, 1)}>Click</button>
}
```

`Input.tsx`

```ts
type InputProps = {
  value: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ value, handleChange }: InputProps) => {
  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(event)
  // }
  return <input type='text' value={value} onChange={handleChange} />
}
```

`Container.tsx`

```ts
type ContainerProps= {
  styles: React.CSSProperties
}

export const Container = (props: ContainerProps) => {
  return (
    <div style={props.styles}>
      Text content goes here
    </div>
  )
}
```