const { useParams, useNavigate, Link } = ReactRouterDOM
export function EmailPreview({email}) {

  function getDate(stamp) {
    const date = new Date(stamp)
    return date.toLocaleDateString()
}
  return  (
    <React.Fragment>
  <td>{email.from}</td>
  <td> {email.subject}</td>
  <td>{email.body}</td>
  <td> {getDate(email.sentAt)}</td>
  <td><Link to={`/mail/${email.id}`}>open </Link></td>
  </React.Fragment>
  )
}
