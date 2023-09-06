import { EmailFilter } from "../cmps/EmailFilter.jsx"
import { EmailHeader } from "../cmps/EmailHeader.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"


const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React


export function MailIndex() {
    const [emails, setEmails] = useState()
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())


    useEffect(() => {
        mailService.getEmails(filterBy)
            .then(setEmails)
    }, [filterBy])

    function onSetFilterBy(filterBy) {
        console.log('filterBy:', filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }
    function onRemoveEmail(emailId) {
        mailService.remove(emailId)
            .then(() => {
                setBooks(prevEmails => prevEmails.filter(email => email.id !== emailId))
                // showSuccessMsg(`book Removed! ${emailId}`)
            })
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
                    <MailList emails={emails} onRemove={onRemoveEmail} />
                </tbody>
            </table>
            <button>{<Link to="/mail/compose">compsoe</Link>}</button>
        </section>)
}

