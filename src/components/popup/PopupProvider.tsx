'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { ContactModal } from './ContactModal'
import { 
  PopupState, 
  PopupTriggerType,
  getPopupState, 
  savePopupState,
  shouldShowPopup,
  incrementPageViews
} from '@/lib/popup-utils'

interface PopupContextType {
  state: PopupState
  showPopup: (triggerSource: PopupTriggerType) => void
  hidePopup: () => void
  dismissPopup: () => void
}

const PopupContext = createContext<PopupContextType | null>(null)

type PopupAction =
  | { type: 'SHOW_POPUP'; triggerSource: PopupTriggerType }
  | { type: 'HIDE_POPUP' }
  | { type: 'DISMISS_POPUP' }
  | { type: 'MARK_SUBMITTED' }
  | { type: 'LOAD_STATE'; state: PopupState }

function popupReducer(state: PopupState, action: PopupAction): PopupState {
  switch (action.type) {
    case 'LOAD_STATE':
      return action.state

    case 'SHOW_POPUP':
      if (!shouldShowPopup()) {
        return state
      }
      return {
        ...state,
        isOpen: true,
        hasBeenShown: true,
        triggerSource: action.triggerSource
      }

    case 'HIDE_POPUP':
      return {
        ...state,
        isOpen: false,
        triggerSource: null
      }

    case 'DISMISS_POPUP':
      const dismissedState = {
        ...state,
        isOpen: false,
        lastDismissed: Date.now(),
        triggerSource: null
      }
      savePopupState(dismissedState)
      return dismissedState

    case 'MARK_SUBMITTED':
      const submittedState = {
        ...state,
        isOpen: false,
        submissionCount: state.submissionCount + 1,
        triggerSource: null
      }
      savePopupState(submittedState)
      return submittedState

    default:
      return state
  }
}

interface PopupProviderProps {
  children: ReactNode
}

export function PopupProvider({ children }: PopupProviderProps) {
  const [state, dispatch] = useReducer(popupReducer, {
    isOpen: false,
    hasBeenShown: false,
    lastDismissed: null,
    submissionCount: 0,
    triggerSource: null
  })

  // Load initial state from localStorage on mount
  useEffect(() => {
    const savedState = getPopupState()
    dispatch({ type: 'LOAD_STATE', state: savedState })
    
    // Increment page views for this session
    incrementPageViews()
  }, [])

  // Save state changes to localStorage
  useEffect(() => {
    if (state.hasBeenShown || state.lastDismissed || state.submissionCount > 0) {
      savePopupState(state)
    }
  }, [state])

  const showPopup = (triggerSource: PopupTriggerType) => {
    dispatch({ type: 'SHOW_POPUP', triggerSource })
  }

  const hidePopup = () => {
    dispatch({ type: 'HIDE_POPUP' })
  }

  const dismissPopup = () => {
    dispatch({ type: 'DISMISS_POPUP' })
  }

  const contextValue: PopupContextType = {
    state,
    showPopup,
    hidePopup,
    dismissPopup
  }

  return (
    <PopupContext.Provider value={contextValue}>
      {children}
      <ContactModal
        isOpen={state.isOpen}
        onClose={dismissPopup}
        triggerSource={state.triggerSource || 'unknown'}
      />
    </PopupContext.Provider>
  )
}

export function usePopup(): PopupContextType {
  const context = useContext(PopupContext)
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider')
  }
  return context
}

// Hook for manual popup triggering (e.g., from buttons)
export function useManualPopup() {
  const { showPopup } = usePopup()
  
  return {
    triggerPopup: () => showPopup('manual')
  }
}