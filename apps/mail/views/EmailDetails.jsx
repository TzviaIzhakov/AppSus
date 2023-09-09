import { storageService } from "../../../services/async-storage.service"
import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"
const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function EmailDetails() {
    const [email, setEmail] = useState()
    const { emailId } = useParams()
    const navigate= useNavigate()
    const currentPath = window.location.hash;
    const pathSegments = currentPath.split('/');
    const state = pathSegments[pathSegments.length - 2];

    useEffect(() => {
      console.log(state);
        mailService.get(emailId)
        .then(email=>{
            email.isRead=true
            mailService.save(email)
            setEmail(email)})
    }, [emailId])

function goBack(){
    navigate(-1)
}


    if (!email) return <div>loading</div>

    return (<section className="mails-container">
        <h3>{email.subject}</h3>
        <div className="flex space-between"><span>{email.from}</span> <span>{utilService.getDate(email.sentAt)} </span> </div>
        <p>{email.body} </p>
        {<button onClick={goBack}> Back </button>}
 
    </section>
    )
}