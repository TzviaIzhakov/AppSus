const { Link } = ReactRouterDOM
const { useState, useEffect } = React



export function EmailHeader({ changeState }) {
const [isOpen,setIsOpen]= useState(false)
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
                <img onClick={toggleMenu} className="hamburger" src="./assets/icons-notes/menu_FILL0_wght400_GRAD0_opsz24.png" alt="" />
                <img className="logo" src="./assets/icons-notes/gmail.logo.png" alt="" />
                <h2> GMAIL</h2>
                <ul className="side-bar list-clean">
                    <li>{<Link to="/mail/compose"><img src="./assets/icons-notes/edit_FILL0_wght400_GRAD0_opsz24.png" alt="" /></Link>} <span className={dynClass}>Compsoe</span></li>
                    <li onClick={() => changeState('sent')}><img src="./assets/icons-notes/send_FILL0_wght400_GRAD0_opsz24.png" alt="" /> <span className={dynClass}>Sent</span></li>
                    <li onClick={() => changeState('inbox')}><img src="./assets/icons-notes/inbox_FILL0_wght400_GRAD0_opsz24.png" alt="" /> <span className={dynClass}>Inbox</span></li>
                    <li onClick={() => changeState('star')}><i className="fa-regular fa-star"></i><span className={dynClass}>Starred</span></li>
                </ul>
            </section>
        </React.Fragment>
    )
}