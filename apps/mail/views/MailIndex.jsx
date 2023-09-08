import { EmailFilter } from "../cmps/EmailFilter.jsx"
import { EmailHeader } from "../cmps/EmailHeader.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"


const { useNavigate, Outlet, useSearchParams, Link } = ReactRouterDOM
const { useState, useEffect } = React


export function MailIndex() {
    const [emails, setEmails] = useState()
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [state, setstate] = useState('inbox')
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();

    const mail = searchParams.has('sent')

    useEffect(() => {
        console.log(state);
        console.log(mail, 'mail');
        if (state === 'inbox') {
            mailService.getEmails(filterBy)
                .then(setEmails)

        }
        if (state === 'sent') {
            mailService.getSentEmails(filterBy)
                .then(setEmails)
        }
        if (state === 'star') {
            mailService.getStarEmails(filterBy)
                .then(setEmails)
        }

    }, [filterBy, state])

    function onSetFilterBy(filterBy) {
        console.log('filterBy:', filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }
    function onRemoveEmail(event, emailId) {
        event.stopPropagation()
        mailService.remove(emailId)
            .then(() => {
                setEmails(prevEmails => prevEmails.filter(email => email.id !== emailId))
                // showSuccessMsg(`book Removed! ${emailId}`)
            })
    }
    function changeState(stateToMod) {
        setstate(stateToMod)
        // setEmails(null)
        if (state === 'sent') navigate('/mail/sent')
        if (state === 'inbox') navigate('/mail/')
        // if(state==='star')navigate('/mail/star')

    }
    function onChangeStar(ev, emailId) {
        ev.stopPropagation()
        console.log('ev', ev);
        mailService.get(emailId)
            .then(email => email.isStar = !email.isStar)
            .then(em => console.log(em, 'em'))
    }

    if (!emails) return <div>loading...</div>
    return (
        <section>
            <header className="email-header">
                <EmailHeader changeState={changeState} />

                <EmailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            </header>
            <section className="emails-container">
                <table className="emails-table">
                    <tbody>
                        <MailList changeStar={onChangeStar} state={state} emails={emails} onRemove={onRemoveEmail} />
                    </tbody>
                </table>
            </section>


            <section>
                <Outlet />
            </section>
        </section>)
}

