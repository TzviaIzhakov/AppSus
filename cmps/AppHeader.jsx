const { Link, NavLink } = ReactRouterDOM;

export function AppHeader({ setShowMainHeader }) {
  return (
    <header className="app-header">
      <Link to="/">
        <h1 style={{ fontSize: `35px` }}>🐴</h1>
      </Link>
      <nav className="flex">
        <NavLink to="/" onClick={() => setShowMainHeader(true)}>
          <img
            src="assets/icons-notes/google-home.jpg"
            alt=""
            className="mail"
          />
        </NavLink>
        {/* <NavLink to="/about">About</NavLink> */}
        <NavLink to="/mail/inbox" onClick={() => setShowMainHeader(false)}>
          <img
            src="assets/icons-notes/gmail.logo.png"
            alt=""
            className="mail"
          />
        </NavLink>
        <NavLink to="/note" onClick={() => setShowMainHeader(false)}>
          <img src="assets/icons-notes/logo-keep.png" alt="" />
        </NavLink>
      </nav>
    </header>
  );
}
