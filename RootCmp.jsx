const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"
import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"
import { EmailDetails } from "./apps/mail/views/EmailDetails.jsx"
import { EmailCompose } from "./apps/mail/cmps/EmailCompose.jsx"



export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} >
                    <Route path="compose" element={<EmailCompose />} />
                </Route>
                <Route path="/mail/sent" element={<MailIndex sent={true} />} />
                <Route path="/mail/:emailId" element={<EmailDetails />} />
                <Route path="/mail/sent/:emailId" element={<EmailDetails sent={true}/>} />
                <Route path="/note" element={<NoteIndex />} />
            </Routes>
        </section>
    </Router>
}
