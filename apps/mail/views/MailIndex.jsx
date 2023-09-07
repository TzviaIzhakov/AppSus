import { EmailFilter } from "../cmps/EmailFilter.jsx"
import { EmailHeader } from "../cmps/EmailHeader.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"


const { useNavigate,Outlet, useSearchParams, Link } = ReactRouterDOM
const { useState, useEffect } = React


export function MailIndex() {
    const [emails, setEmails] = useState()
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [state, setstate] = useState('inbox')
    // const [sent,setSent] = useState()
    const navigate =useNavigate()
    // const [searchParams, setSearchParams] = useSearchParams();
    // let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
  console.log(state);
        
        if (state==='inbox') {
            mailService.getEmails(filterBy)
                .then(setEmails)
                
        }
        if (state==='sent') {
            mailService.getSentEmails(filterBy)
                .then(setEmails)
        }
        if(state==='star'){
            mailService.getStarEmails(filterBy)
            .then(setEmails)
        }

    }, [filterBy,state])

    function onSetFilterBy(filterBy) {
        console.log('filterBy:', filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }
    function onRemoveEmail(event,emailId) {
        event.stopPropagation()
        mailService.remove(emailId)
            .then(() => {
                setEmails(prevEmails => prevEmails.filter(email => email.id !== emailId))
                // showSuccessMsg(`book Removed! ${emailId}`)
            })
    }
function changeState(stateToMod){
    setstate(stateToMod)
    // setEmails(null)
    if(state==='sent')navigate('/mail/sent')
    if(state==='inbox')navigate('/mail/')
    // if(state==='star')navigate('/mail/star')
    
}

    if (!emails) return <div>loading...</div>
    return (
        <section>
            <header className="email-header">
                <EmailHeader changeState={changeState}/>

                <EmailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            </header>
            <section className="emails-container">
            <table className="emails-table">
                <tbody>
                    <MailList state={state} emails={emails} onRemove={onRemoveEmail} />
                </tbody>
            </table>
            </section>
           

            <section>
                <Outlet />
            </section>
        </section>)
}

