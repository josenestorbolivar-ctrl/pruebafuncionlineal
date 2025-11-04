
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  userType: 'student' | 'teacher' | 'parent'
  grade?: string
  studentId?: string
  createdAt: string
}

// Simple persistent storage for MVP using file system
import fs from 'fs'
import path from 'path'

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json')
const PASSWORDS_FILE = path.join(process.cwd(), 'data', 'passwords.json')

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data')
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// Default users
const defaultUsers: User[] = [
  {
    id: '1',
    email: 'john@doe.com',
    firstName: 'John',
    lastName: 'Doe',
    userType: 'teacher',
    createdAt: new Date().toISOString()
  },
  {
    id: '2', 
    email: 'estudiante@demo.com',
    firstName: 'María',
    lastName: 'González',
    userType: 'student',
    grade: '8',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    email: 'padre@demo.com', 
    firstName: 'Carlos',
    lastName: 'González',
    userType: 'parent',
    studentId: '2',
    createdAt: new Date().toISOString()
  }
]

const defaultPasswords: { [email: string]: string } = {
  'john@doe.com': bcrypt.hashSync('johndoe123', 10),
  'estudiante@demo.com': bcrypt.hashSync('demo123', 10),
  'padre@demo.com': bcrypt.hashSync('demo123', 10)
}

// Load users from file or use defaults
function loadUsers(): User[] {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf8')
      return JSON.parse(data)
    } else {
      saveUsers(defaultUsers)
      return defaultUsers
    }
  } catch (error) {
    console.error('Error loading users:', error)
    return defaultUsers
  }
}

// Save users to file
function saveUsers(users: User[]): void {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
  } catch (error) {
    console.error('Error saving users:', error)
  }
}

// Load passwords from file or use defaults
function loadPasswords(): { [email: string]: string } {
  try {
    if (fs.existsSync(PASSWORDS_FILE)) {
      const data = fs.readFileSync(PASSWORDS_FILE, 'utf8')
      return JSON.parse(data)
    } else {
      savePasswords(defaultPasswords)
      return defaultPasswords
    }
  } catch (error) {
    console.error('Error loading passwords:', error)
    return defaultPasswords
  }
}

// Save passwords to file
function savePasswords(passwords: { [email: string]: string }): void {
  try {
    fs.writeFileSync(PASSWORDS_FILE, JSON.stringify(passwords, null, 2))
  } catch (error) {
    console.error('Error saving passwords:', error)
  }
}

// Initialize data
let users: User[] = loadUsers()
let passwords: { [email: string]: string } = loadPasswords()

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = users.find(u => u.email === credentials.email)
        const hashedPassword = passwords[credentials.email]
        
        if (!user || !hashedPassword) {
          return null
        }

        const isValidPassword = await bcrypt.compare(credentials.password, hashedPassword)
        
        if (!isValidPassword) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          userType: user.userType,
          grade: user.grade,
          studentId: user.studentId
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login'
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userType = (user as any).userType
        token.grade = (user as any).grade
        token.studentId = (user as any).studentId
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).userType = token.userType as string
        (session.user as any).grade = token.grade as string
        (session.user as any).studentId = token.studentId as string
      }
      return session
    }
  }
}

export async function createUser(userData: {
  email: string
  password: string
  firstName: string
  lastName: string
  userType: 'student' | 'teacher' | 'parent'
  grade?: string
  studentId?: string
}) {
  // Check if user already exists
  const existingUser = users.find(u => u.email === userData.email)
  if (existingUser) {
    throw new Error('El usuario ya existe con este correo electrónico')
  }
  
  const hashedPassword = await bcrypt.hash(userData.password, 10)
  
  const newUser: User = {
    id: (users.length + 1).toString(),
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
    userType: userData.userType,
    grade: userData.grade,
    studentId: userData.studentId,
    createdAt: new Date().toISOString()
  }
  
  // Add user to memory
  users.push(newUser)
  passwords[userData.email] = hashedPassword
  
  // Persist to file system
  saveUsers(users)
  savePasswords(passwords)
  
  console.log('Usuario creado y guardado:', {
    id: newUser.id,
    email: newUser.email,
    userType: newUser.userType,
    totalUsers: users.length
  })
  
  return newUser
}

export function getUsers() {
  return users.filter(user => user.userType === 'student')
}

export function getUserById(id: string) {
  return users.find(user => user.id === id)
}
