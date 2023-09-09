const { useState, useEffect, useRef } = React
const { useParams, useNavigate, Link } = ReactRouterDOM


import { mailService } from "../services/mail.service.js"

export function EmailCompose() {
  const navigate = useNavigate()
  const [emailTosend, setEmailTosend] = useState()
  const intervalId = useRef()

  useEffect(() => {

    mailService.getDraft()
      .then(email=>{
        console.log(email,'email');
        setEmailTosend(email)
        // console.log(emailTosend)
      })
      .then(email=>console.log(emailTosend))
      .then(() => {
        if (!emailTosend) setEmailTosend(mailService.getEmptyEmail())
        console.log(emailTosend, 'emialtosend');
      })

    console.log(emailTosend, 'emialtosend');
    intervalId.current = setInterval(() => {
      console.log(emailTosend, 'emialtosend');
      mailService.saveDraft(emailTosend)
    }, 5000);

    return () => {
      clearInterval(intervalId.current)
    }
  }, [])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value
    console.log(field, value);
    setEmailTosend(prevEmail => ({ ...prevEmail, [field]: value }))
    console.log(emailTosend);
  }
  function closeModal() {
    navigate(-1)
  }


  function sendEmail(ev) {
    ev.preventDefault()
    mailService.saveSent(emailTosend)
      .then(res => console.log(res, 'res'))
      .then(navigate(-1))
  }

  if (!emailTosend) return
  const { subject, body, to } = emailTosend
  return (<section className="compsoe-modal">
    <div className="flex space-between modal-header"><span>new message</span> <button onClick={closeModal}>x</button></div>
    <form className="compose-form" onSubmit={sendEmail}>
      <label htmlFor="to"></label>
      <input value={to} onChange={handleChange} placeholder="To" type="email" name="to" id="to" />
      <label htmlFor="subject"></label>
      <input value={subject} onChange={handleChange} placeholder="Subject" type="text" name="subject" id="subject" />
      <label htmlFor="body"></label>
      <textarea value={body} onChange={handleChange} type="text" name="body" id="body" />
      <section className="modal-footer">
        <button>Send</button>
      </section>
    </form>
  </section>
  )
}
