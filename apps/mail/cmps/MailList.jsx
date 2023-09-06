import { EmailPreview } from "./EmailPreview.jsx"
const { useParams, useNavigate, Link } = ReactRouterDOM


export function MailList({ emails, onRemove,sent }) {


    return emails.map(email => <tr className={email.isRead ? 'read' : ''} key={email.id}>
        <EmailPreview sent={sent} onRemove={onRemove} email={email} />
    </tr>)
}

