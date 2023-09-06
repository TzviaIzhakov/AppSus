import { EmailPreview } from "./EmailPreview.jsx"
const { useParams, useNavigate, Link } = ReactRouterDOM


export function MailList({emails,onRemove}) {
 

    return  emails.map(email => <tr className={email.isRead?'read': ''} key={email.id}>
   <EmailPreview onRemove={onRemove} email={email}/>
   </tr>)
    }

