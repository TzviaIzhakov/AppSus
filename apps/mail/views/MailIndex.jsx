import { EmailFilter } from "../cmps/EmailFilter.jsx"
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
    })

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
            <EmailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <table className="emails-table">
                <tbody>
                    <MailList emails={emails} onRemove={onRemoveEmail} />
                </tbody>
            </table>
        </section>)
}

