import React from 'react';
import { IUser } from './lib/api'

export const DEFAULT_STATE = {
    user: undefined,
    hasError: false
}
export const AppContext = React.createContext<{ user?: IUser }>(DEFAULT_STATE)
