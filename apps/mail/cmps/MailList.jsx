import { EmailPreview } from "./EmailPreview.jsx"
const { useParams, useNavigate, Link } = ReactRouterDOM


export function MailList({ emails, onRemove,state, changeStar }) {
    const navigate = useNavigate()

    function openEmail(emailId) {
        console.log(state, 'sentlist');
         navigate(`/mail/${state}/${emailId}`)

    }

    return emails.map(email => <tr onClick={() => openEmail(email.id)} className={email.isRead ? 'read' : ''} key={email.id}>
        <EmailPreview changeStar={changeStar} state={state} onRemove={onRemove} email={email} />
    </tr>)
}

