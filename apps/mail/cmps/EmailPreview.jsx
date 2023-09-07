const { useParams, useNavigate, Link } = ReactRouterDOM

import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"; 
const { useState, useEffect } = React

export function EmailPreview({ email, onRemove, state }) {
const [curEmail,setCurEmail]=useState(email)


  function changeStar(event) {
email.isStar=!email.isStar
    mailService.save(email)
    event.stopPropagation()
  }

  return (
    <React.Fragment>
      <td className="star-rating" ><button className={email.isStar ? 'on' : 'off'} onClick={changeStar} ><span className='star'>
              <i className='fa-solid fa-star fa-lg'></i>
            </span>
      </button></td>
      <td>{state==='sent' ? 'To: ' + email.to : email.from}</td>
      <td> {email.subject}</td>
      <td className="email-body">{email.body}</td>
      <td> {utilService.getDate(email.sentAt)}</td>
      <td className="remove" ><img onClick={(ev) => onRemove(ev,email.id)} src="./assets/icons-notes/delete.svg" /></td>
    </React.Fragment>
  )
}
