export const TOKEN_KEY = "tokenPland"

export const isAuthenticate = () => localStorage.getItem(TOKEN_KEY) !== null

export const getToken = ()=> localStorage.getItem(TOKEN_KEY)

export const setSignIn = token => {
    localStorage.setItem(TOKEN_KEY, token)
}

export const logout = () => localStorage.removeItem(TOKEN_KEY)