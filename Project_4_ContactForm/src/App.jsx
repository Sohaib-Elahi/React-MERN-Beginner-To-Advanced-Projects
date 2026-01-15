import { useState } from 'react'
import { Toaster } from 'sonner'
import ContactForm from './components/ContactForm'



function App() {
  return (
    // Main Layout Container
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-200 flex items-center justify-center p-4">
        {/* Contact Form Placeholder */}
        <ContactForm />

        {/* Toast Notification Provider */}
        <Toaster position='top-center' richColors/>
    </div>
  ) 
}

export default App
