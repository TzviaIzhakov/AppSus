import { EmailPreview } from "./EmailPreview.jsx"
const { useParams, useNavigate, Link } = ReactRouterDOM


export function MailList({ emails, onRemove, sent, changeStar }) {
    const navigate = useNavigate()

    function openEmail(emailId) {
        console.log(sent, 'sentlist');
        if (!sent) navigate(`/mail/${emailId}`)
        else navigate(`/mail/sent/${emailId}`)
    }

    return emails.map(email => <tr onClick={() => openEmail(email.id)} className={!sent && email.isRead ? 'read' : ''} key={email.id}>
        <EmailPreview changeStar={changeStar} sent={sent} onRemove={onRemove} email={email} />
    </tr>)
}

