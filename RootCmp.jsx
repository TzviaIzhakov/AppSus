const { Route, Routes } = ReactRouterDOM;
const Router = ReactRouterDOM.HashRouter;
const { useState, useEffect } = React;
import { AppHeader } from './cmps/AppHeader.jsx';
import { About } from './views/About.jsx';
import { Home } from './views/Home.jsx';
import { MailIndex } from './apps/mail/views/MailIndex.jsx';
import { NoteIndex } from './apps/note/views/NoteIndex.jsx';
import { EmailDetails } from './apps/mail/views/EmailDetails.jsx';
import { EmailCompose } from './apps/mail/cmps/EmailCompose.jsx';

export function App() {
  const [showMainHeader, setShowMainHeader] = useState(true);
  return (
    <Router>
      <section className="app">
        {showMainHeader && <AppHeader setShowMainHeader={setShowMainHeader} />}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route
            path="/mail/:state"
            element={<MailIndex setShowMainHeader={setShowMainHeader} />}
          >
            <Route path="compose" element={<EmailCompose />} />
          </Route>
          <Route
            path="/mail/inbox"
            element={<MailIndex setShowMainHeader={setShowMainHeader} />}
          />
          <Route
            path="/mail/sent"
            element={<MailIndex setShowMainHeader={setShowMainHeader} />}
          />
          <Route
            path="/mail/star"
            element={<MailIndex setShowMainHeader={setShowMainHeader} />}
          />
          <Route path="/mail/inbox/:emailId" element={<EmailDetails />} />
          <Route path="/mail/sent/:emailId" element={<EmailDetails />} />
          <Route path="/mail/star/:emailId" element={<EmailDetails />} />

          <Route
            path="/note"
            element={<NoteIndex setShowMainHeader={setShowMainHeader} />}
          />
        </Routes>
      </section>
    </Router>
  );
}
