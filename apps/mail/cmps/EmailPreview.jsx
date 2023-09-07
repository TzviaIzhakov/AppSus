const { useParams, useNavigate, Link } = ReactRouterDOM

import { utilService } from "../../../services/util.service.js"

export function EmailPreview({email,onRemove,sent}) {


  return  (
    <React.Fragment>
  <td>{sent?'To: '+ email.to: email.from}</td>
  <td> {email.subject}</td>
  <td className="email-body">{email.body}</td>
  <td> {utilService.getDate(email.sentAt)}</td>
  <td className="remove" ><img onClick={()=>onRemove(email.id)} src="./assets/icons-notes/delete.svg"/></td>
  </React.Fragment>
  )
}
