const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function EmailDetails(){
    const params = useParams()
console.log(params);
    return <div>details Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas quibusdam at corrupti, deserunt provident eius quia illum recusandae libero reprehenderit quis molestiae sunt culpa dolore! Ratione odit natus placeat labore.</div>
}