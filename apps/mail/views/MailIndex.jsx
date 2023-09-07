import { EmailFilter } from "../cmps/EmailFilter.jsx"
import { EmailHeader } from "../cmps/EmailHeader.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"


const { useNavigate,Outlet, useSearchParams, Link } = ReactRouterDOM
const { useState, useEffect } = React


export function MailIndex({sent=false}) {
    const [emails, setEmails] = useState()
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    // const [sent,setSent] = useState()
    const navigate =useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    // let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setSearchParams({sent:sent})
        console.log(sent);
        if (!sent) {
            mailService.getEmails(filterBy)
                .then(setEmails)
                
        }
        if (sent) {
            mailService.getSentEmails(filterBy)
                .then(setEmails)
        }
    }, [filterBy,sent])

    function onSetFilterBy(filterBy) {
        console.log('filterBy:', filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }
    function onRemoveEmail(emailId) {
        mailService.remove(emailId)
            .then(() => {
                setEmails(prevEmails => prevEmails.filter(email => email.id !== emailId))
                // showSuccessMsg(`book Removed! ${emailId}`)
            })
    }
function changeSent(state){
    if(sent===state)return
    setEmails(null)
    if(!sent)navigate('/mail/sent')
    else navigate('/mail/')
    sent=state
}

    if (!emails) return <div>loading...</div>
    return (
        <section>
            <header className="email-header">
                <EmailHeader />

                <EmailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            </header>
            <table className="emails-table">
                <tbody>
                    <MailList sent={sent} emails={emails} onRemove={onRemoveEmail} />
                </tbody>
            </table>
            <button>{<Link to="/mail/compose">compsoe</Link>}</button>
            <button onClick={()=>changeSent(true)}>Sent</button>
            <button onClick={()=>changeSent(false)}>Inbox</button>
            <section>
                <Outlet />
            </section>
        </section>)
}

