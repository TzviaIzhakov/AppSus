const { Link } = ReactRouterDOM
const { useState, useEffect } = React



export function EmailHeader({ setEmails }) {
const [isOpen,setIsOpen]= useState(true)
const [dynClass,setDynClass] =useState("icon-text")

function toggleMenu(){
    setIsOpen(!isOpen)
    if(isOpen)setDynClass("icon-text open")
    else setDynClass("icon-text")
    console.log(dynClass);
}



    return (
        <React.Fragment>
            <section className="title flex">
                <img onClick={toggleMenu} className="humburger" src="./assets/icons-notes/humburger.svg" alt="" />
                <img className="logo" src="./assets/icons-notes/gmail.logo.png" alt="" />
                <h2> GMAIL</h2>
                <ul className="side-bar list-clean">
                    <li className="compose">{<Link to="/mail/compose"><img src="./assets/icons-notes/edit-outline.svg" alt="" /></Link>} <span className={dynClass}>Compsoe</span></li>
                    <li onClick={()=>setEmails(null)}> <Link to="/mail/sent"><img src="./assets/icons-notes/send-outline.svg" alt="" /> <span className={dynClass}>Sent</span></Link></li>
                    <li onClick={()=>setEmails(null)}> <Link to="/mail/inbox"><img src="./assets/icons-notes/inbox.svg" alt="" /> <span className={dynClass}>Inbox</span></Link></li>
                    <li onClick={()=>setEmails(null)}><Link to="/mail/star"><i className="fa-regular fa-star"></i><span className={dynClass}>Starred</span></Link></li>
                </ul>
            </section>
        </React.Fragment>
    )
}