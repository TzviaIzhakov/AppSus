import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"
const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React


export function MailIndex() {
    const [emails, setEmails] = useState()

    useEffect(() => {
        mailService.getEmails()
            .then(setEmails)
    })
function onRemoveEmail(emailId){
    mailService.remove(emailId)
    .then(() => {
        setBooks(prevEmails => prevEmails.filter(email => email.id !== emailId))
        // showSuccessMsg(`book Removed! ${emailId}`)
    })
}
  

    if (!emails) return <div>loading...</div>
    return <table className="emails-table">
        <tbody>
          <MailList emails={emails} onRemove={onRemoveEmail}/>
        </tbody>
    </table>
}

