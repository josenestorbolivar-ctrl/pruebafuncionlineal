
'use client'

import { useEffect, ReactNode } from 'react'

interface PWAProviderProps {
  children: ReactNode
}

export function PWAProvider({ children }: PWAProviderProps) {
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration)
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError)
        })
    }

    // Install prompt
    let deferredPrompt: any
    
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt = e
      
      // Show custom install button
      const installButton = document.getElementById('pwa-install-button')
      if (installButton) {
        installButton.style.display = 'block'
        installButton.addEventListener('click', () => {
          if (deferredPrompt) {
            deferredPrompt.prompt()
            deferredPrompt.userChoice.then((choiceResult: any) => {
              if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt')
              }
              deferredPrompt = null
            })
          }
        })
      }
    })

    // Track app installation
    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed')
    })

    // Offline/Online status
    const updateOnlineStatus = () => {
      if (navigator.onLine) {
        document.body.classList.remove('offline')
      } else {
        document.body.classList.add('offline')
      }
    }

    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
    updateOnlineStatus()

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

  return <>{children}</>
}
