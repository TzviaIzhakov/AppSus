import { storageService } from "../../../services/async-storage.service"
import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"
const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function EmailDetails({sent=false}) {
    const [email, setEmail] = useState()
    const { emailId } = useParams()
    const navigate= useNavigate()
    useEffect(() => {
        console.log(sent);
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
        {!sent&&<button><Link to="/mail"> Back</Link> </button>}
        {sent&&<button><Link to="/mail/sent"> Back</Link> </button>}
    </section>
    )
}