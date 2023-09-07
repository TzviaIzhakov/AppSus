const { Link } = ReactRouterDOM
const { useState, useEffect } = React
export function EmailHeader({ changeSent }) {
const [isOpen,setIsOpen]= useState(false)
const [dynClass,setDynClass] =useState("side-bar clean-list")

function toggleMenu(){
    setIsOpen(!isOpen)
    if(isOpen)setDynClass("side-bar clean-list open")
    else setDynClass("side-bar clean-list")
    console.log(dynClass);
}



    return (
        <React.Fragment>
            <section className="title flex">
                <img onClick={toggleMenu} className="hamburger" src="./assets/icons-notes/menu_FILL0_wght400_GRAD0_opsz24.png" alt="" />
                <img className="logo" src="./assets/icons-notes/gmail.logo.png" alt="" />
                <h2> GMAIL</h2>
                <ul className={dynClass}>
                    <li>{<Link to="/mail/compose"><img src="./assets/icons-notes/edit_FILL0_wght400_GRAD0_opsz24.png" alt="" /></Link>}</li>
                    <li onClick={() => changeSent(true)}><img src="./assets/icons-notes/send_FILL0_wght400_GRAD0_opsz24.png" alt="" /> </li>
                    <li onClick={() => changeSent(false)}><img src="./assets/icons-notes/inbox_FILL0_wght400_GRAD0_opsz24.png" alt="" /></li>
                </ul>
            </section>
        </React.Fragment>
    )
}