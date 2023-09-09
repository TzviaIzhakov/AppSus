import { EmailFolderList } from "./EmailFolderList.jsx"
const { Link } = ReactRouterDOM
const { useState, useEffect } = React



export function EmailHeader({ state, setEmails }) {
    const [dynClass, setDynClass] = useState("icon-text")
   const [isOpen, setIsOpen] = useState(true)

    // let dynClass
   


    function toggleMenu() {
        setIsOpen(!isOpen)
        if (isOpen) setDynClass("icon-text list-clean open")
        else setDynClass("icon-text list-clean")
        console.log(dynClass);
    }



    return (

        <section className="title flex">
            <img onClick={toggleMenu} className="humburger" src="./assets/icons-notes/humburger.svg" alt="" />
            <img className="logo" src="./assets/icons-notes/gmail.logo.png" alt="" />
            <h2> GMAIL</h2>
            <EmailFolderList setEmails={setEmails} dynClass={dynClass} state={state}/>
        </section>

    )
}