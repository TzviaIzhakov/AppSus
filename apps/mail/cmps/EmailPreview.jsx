const { useParams, useNavigate, Link } = ReactRouterDOM
import { LongTxt } from "../../../cmps/long-txt.jsx"
import { utilService } from "../../../services/util.service.js"

export function EmailPreview({email,onRemove}) {


  return  (
    <React.Fragment>
  <td>{email.from}</td>
  <td> {email.subject}</td>
  <td className="email-body">{email.body}</td>
  <td> {utilService.getDate(email.sentAt)}</td>
  <td><Link to={`/mail/${email.id}`}>open </Link></td>
  <td className="remove" ><img onClick={()=>onRemove(email.id)} src="./assets/icons-notes/delete.svg"/></td>
  </React.Fragment>
  )
}
