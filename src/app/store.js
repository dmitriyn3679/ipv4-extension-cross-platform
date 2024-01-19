import { configureStore } from '@reduxjs/toolkit'
import translationReducer from "../features/translation"
import authReducer from "../features/auth"
import contentReducer from "../features/content"
import settingsReducer from "../features/settings"

export const store = configureStore({
  reducer: {
    translation: translationReducer,
    auth: authReducer,
    content: contentReducer,
    settings: settingsReducer
  },
})
