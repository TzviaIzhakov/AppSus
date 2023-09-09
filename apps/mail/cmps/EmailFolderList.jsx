const { Link } = ReactRouterDOM
const { useState, useEffect } = React
import { mailService } from "../services/mail.service.js"


export function EmailFolderList({state,dynClass,setEmails}) {
  
  const [sentEmails, setSentEmails] = useState()
  const [inboxEmails, setInboxEmails] = useState()

     
  useEffect(() => {
    mailService.sentEmailCount()
        .then(setSentEmails)
    mailService.inboxEmailCount()
        .then(setInboxEmails)

}, [])
  
  return (<React.Fragment>
    <ul className="side-bar list-clean">
      <li className="compose">{<Link to={`/mail/${state}/compose`}><img src="./assets/icons-notes/edit-outline.svg" alt="" /></Link>} </li>
      <li onClick={() => setEmails(null)}> <Link to="/mail/sent"><img src="./assets/icons-notes/send-outline.svg" alt="" /></Link></li>
      <li onClick={() => setEmails(null)}> <Link to="/mail/inbox"><img src="./assets/icons-notes/inbox.svg" alt="" /></Link></li>
      <li onClick={() => setEmails(null)}><Link to="/mail/star"><i className="fa-regular fa-star"></i></Link></li>
    </ul>
    <ul className={dynClass}>
      <li className="compose">{<Link to={`/mail/${state}/compose`}><span >Compsoe</span> </Link>} </li>
      <li onClick={() => setEmails(null)}> <Link to="/mail/sent"><span >Sent<span className="email-count">{sentEmails}</span></span></Link></li>
      <li onClick={() => setEmails(null)}> <Link to="/mail/inbox"><span >Inbox<span className="email-count">{inboxEmails}</span></span></Link></li>
      <li onClick={() => setEmails(null)}><Link to="/mail/star"><span >Starred</span></Link></li>
    </ul>
  </React.Fragment>
  )

}
