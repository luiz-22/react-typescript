<h1 align="center">React - TypeScript</h1>

## Temas

- Crear un proyecto con Vite
- Props básico
- Props avanzado
- Props de eventos
- Props de estilos
- useState
- useState valor futuro y aserción
- useReducer 
- useContext
- useContext valor futuro y aserción
- useRef
- Componente de clase
- Componente como prop
- Props genéricas
- Restringir props

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
import { ThemeContextProvider } from './components/context/ThemeContext'
import { Box } from './components/context/Box'
import { UserContextProvider } from './components/context/UserContext'
import { User as UserContext } from './components/context/User'
import { DomRef } from './components/refs/DomRef'
import { MutableRef } from './components/refs/MutableRef'
import { Counter as CounterClass } from './components/class/Counter'
import { Private } from './components/auth/Private'
import { Profile } from './components/auth/Profile'

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
      <LoggedIn />
      <User />
      <Counter />
       <ThemeContextProvider>
        <Box />
      </ThemeContextProvider>
      <UserContextProvider>
        <UserContext />
      </UserContextProvider>
      <DomRef />
      <MutableRef />
      <CounterClass message='The count value is ' />
      <Private isLoggedIn={true} component={Profile}/>
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
// Puedo tener los tipos en un archivo separado para organizar mejor

export type Name = {
  first: string
  last: string
}
export type PersonProps = {
  name: Name // Podría organizarlo de esta manera para reusarlo en distintos lugares
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

### Props de eventos

`Button.tsx`

```ts
type ButtonProps = { // Tipo del evento
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

export const Input = ({ value, handleChange }: InputProps) => { // Puedo destructurar
  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(event)
  // }
  return <input type='text' value={value} onChange={handleChange} />
}
```

### Props de estilos

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

### useState

`LoggedIn.tsx`

```ts
import { useState } from 'react'

export const LoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Infiere en el tipo que le pasamos
  const handleLogin = () => {
    setIsLoggedIn(true)
  }
  const handleLogout = () => {
    setIsLoggedIn(false) // Sin TypeScript, le podríamos pasar un 0
  }
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <div>User is {isLoggedIn ? 'logged in' : 'logged out'}</div>
    </div>
  )
}
```

### useState valor futuro y aserción

`User.tsx`

```ts
import { useState } from 'react'

type AuthUser = {
  name: string
  email: string
}

export const User = () => {
  const [user, setUser] = useState<AuthUser | null>(null) // Explecitamos que en el futuro puede ser AuthUser

  // Si luego que el componente se monte, no tendré un usuario null, puedo usar una aserción
  //const [user, setUser] = useState<AuthUser>({} as AuthUser)

  const handleLogin = () => {
    setUser({
      name: 'Vishwas',
      email: 'vishwas@example.com'
    })
  }
  const handleLogout = () => { // Si uso una asercion, ya no necesitaria esta función
    setUser(null)
  }
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <div>User name is {user?.name}</div> // El usuario pude ser null
      //<div>User name is {user.name}</div> // Si uso una asercion, no necesito el encadenamiento opcional
    </div>
  )
}
```

### useReducer

`Counter.tsx`

```ts
import { useReducer } from 'react'

type CounterState = {
  count: number
}

type UpdateAction = {
  type: 'increment' | 'decrement' // restringimos las Action types
  payload: number
}

type ResetAction = {
  type: 'reset' // restringimos las Action types
}

type CounterAction = UpdateAction | ResetAction // ResetAction no tiene payload

const initialState = { count: 0 }

function reducer(state: CounterState, action: CounterAction) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.payload }
    case 'decrement':
      return { count: state.count - action.payload }
    case 'reset':
      return initialState
    default:
      return state
  }
}

export const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment', payload: 10 })}>
        Increment 10
      </button>
      <button onClick={() => dispatch({ type: 'decrement', payload: 10 })}>
        Decrement 10
      </button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </>
  )
}
```

### useContext

`theme.ts`

```ts
export const theme = {
  primary: {
    main: '#3f51b5',
    text: '#fff'
  },
  secondary: {
    main: '#f50057',
    text: '#fff'
  }
}
```

`ThemeContext.tsx`

```ts
import React, { createContext } from 'react'
import { theme } from './theme'

type ThemeContextProviderProps = {
  children: React.ReactNode
}

export const ThemeContext = createContext(theme)

export const ThemeContextProvider = ({
  children
}: ThemeContextProviderProps) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
```

`Box.tsx`

```ts
import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

export const Box = () => {
  const theme = useContext(ThemeContext)
  return (
    <div
      style={{
        backgroundColor: theme.primary.main,
        color: theme.primary.text
      }}>
      Theme context
    </div>
  )
}
```

### useContext valor futuro y aserción

`UserContext.tsx`

```ts
import React, { useState, createContext } from 'react'

type AuthUser = {
  name: string
  email: string
}

type UserContextType = {
  user: AuthUser | null 
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>
}

type UserContextProviderProps = {
  children: React.ReactNode
}

// export const UserContext = createContext<UserContextType | null>(null) // Valor futuro
export const UserContext = createContext({} as UserContextType) // Aserción

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null) // Especificamos que en el futuro pude ser AuthUser
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
```

`User.tsx`

```ts
import { useContext } from 'react'
import { UserContext } from './UserContext'

export const User = () => {
  const userContext = useContext(UserContext)
  const handleLogin = () => {
    // if (userContext) {
    userContext.setUser({
      name: 'Vishwas',
      email: 'asd@asd.com'
    })
    // }
  }
  const handleLogout = () => {
    // if (userContext) {
    userContext.setUser(null)
    // }
  }
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <div>User name is {userContext.user?.name}</div>
      <div>User email is {userContext.user?.email}</div>
      {/* <div>User name is {userContext?.user?.name}</div>
      <div>User email is {userContext?.user?.email}</div> */}
    </div>
  )
}
```

### useRef

`DomRef.tsx`

```ts
// useRef de solo lecturar
import { useRef, useEffect } from 'react'

export const DomRef = () => {
  // Espeficamos el tipo de elemento del DOM
  // Que no sea null para no usar el encadenamiento opcional
  const inputRef = useRef<HTMLInputElement>(null!) 
  useEffect(() => {
    inputRef.current.focus()
  }, [])
  return (
    <div>
      <input type='text' ref={inputRef} />
    </div>
  )
}
```

`MutableRef.tsx`

```ts
// useRef mutable
import { useState, useRef, useEffect } from 'react'

export const MutableRef = () => {
  const [timer, setTimer] = useState(0)
  const interValRef = useRef<number | null>(null)

  const stopTimer = () => {
    if (interValRef.current) {
      window.clearInterval(interValRef.current)
    }
  }
  useEffect(() => {
    interValRef.current = window.setInterval(() => {
      setTimer(timer => timer + 1)
    }, 1000)
    return () => {
      stopTimer()
    }
  }, [])

  return (
    <div>
      HookTimer - {timer} -
      <button onClick={() => stopTimer()}>Stop Timer</button>
    </div>
  )
}
```

### Componente de clase

`Counter.tsx`

```ts
import { Component } from 'react'

type CounterProps = {
  message: string
}
type CounterState = {
  count: number
}

/** The count value is 5 */
// Si no tengo props, especifico un objeto vacio <{}, CounterState>
export class Counter extends Component<CounterProps, CounterState> {
  state = {
    count: 0
  }

  handleClick = () => {
    this.setState(prevState => ({ count: prevState.count + 1 }))
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Increment</button>
        {this.props.message} {this.state.count}
      </div>
    )
  }
}
```

### Componente como prop

`Login.tsx`

```ts
export const Login = () => {
  return <div>Please login to continue</div>
}
```

`Profile.tsx`

```ts
export type ProfileProps = {
  name: string
}

export const Profile = ({ name }: ProfileProps) => {
  return <div>Private Profile component. Name is {name}</div>
}
```

`Private.tsx`

```ts
import { Login } from './Login'
import { ProfileProps } from './Profile'

type PrivateProps = {
  isLoggedIn: boolean
  Component: React.ComponentType<ProfileProps>
}

// Recibe dos props, isLoggedIn y un componente que necesita ser invocado si el usuario se loggea
export const Private = ({ isLoggedIn, component: Component }: PrivateProps) => {
  if (isLoggedIn) {
    return <Component name='Vishwas' />
  } else {
    return <Login />
  }
}
```

### Props genéricas

`List.tsx`

```ts
type ListProps<T> = {
  items: T[]
  onClick: (value: T) => void
}

// Restringimos que debe tener una propiedad id y que sea number
// Si no hay restricción quedaría <T extends {}>
export const List = <T extends { id: number }>({ 
  items,
  onClick
}: ListProps<T>) => {
  return (
    <div>
      <h2>List of items</h2>
      {items.map(item => {
        return (
          <div key={item.id} onClick={() => onClick(item)}>
            {item.id}
          </div>
        )
      })}
    </div>
  )
}
```

### Restringir props

`List.tsx`

```ts

```