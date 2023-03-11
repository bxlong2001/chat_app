export interface LoginForm {
    email: String,
    password: String
}

export interface RegisterForm {
    fullName: String,
    email: String,
    password: String
}

export interface Message {
    status: 'send' | 'receive',
    message: String
}