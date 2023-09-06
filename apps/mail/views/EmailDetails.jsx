import { storageService } from "../../../services/async-storage.service"
import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"
const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function EmailDetails() {
    const [email, setEmail] = useState()
    const { emailId } = useParams()
    useEffect(() => {
        mailService.get(emailId)
        .then(email=>{
            email.isRead=true
            mailService.save(email)
            setEmail(email)})
    }, [emailId])


    if (!email) return <div>loading</div>

    return (<section className="mails-container">
        <h3>{email.subject}</h3>
        <div className="flex space-between"><span>{email.from}</span> <span>{utilService.getDate(email.sentAt)} </span> </div>
        <p>{email.body} </p>
        <button><Link to="/mail"> Back</Link> </button>
    </section>
    )
}