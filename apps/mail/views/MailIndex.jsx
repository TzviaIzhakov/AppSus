import { EmailFilter } from '../cmps/EmailFilter.jsx';
import { EmailHeader } from '../cmps/EmailHeader.jsx';
import { MailList } from '../cmps/MailList.jsx';
import { mailService } from '../services/mail.service.js';
import { EmailsSort } from '../cmps/EmailsSorst.jsx';

const { useNavigate, Outlet, useSearchParams, Link } = ReactRouterDOM;
const { useState, useEffect } = React;

export function MailIndex({ setShowMainHeader }) {
  const [emails, setEmails] = useState(null);
  const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter());
  const [state, setstate] = useState('inbox');
  const [sortKey, setSortKey] = useState();
  const navigate = useNavigate();
  // const [searchParams, setSearchParams] = useSearchParams();
  const currentPath = window.location.hash;
  const pathSegments = currentPath.split('/');
  const lastSegment = pathSegments[2];

  useEffect(() => {
    setstate(lastSegment);
    console.log(sortKey, 'sortkey');
    if (state === 'inbox') {
      mailService.getEmails(filterBy, sortKey).then(setEmails);
    }
    if (state === 'sent') {
      mailService.getSentEmails(filterBy, sortKey).then(setEmails);
    }
    if (state === 'star') {
      mailService.getStarEmails(filterBy, sortKey).then(setEmails);
    }
    if (state === 'trash') {
      mailService.getTrashEmails(filterBy, sortKey).then(setEmails);
    }
  }, [filterBy, state, lastSegment, sortKey]);

  function onSetFilterBy(filterBy) {
    console.log('filterBy:', filterBy);
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }));
  }
  function onRemoveEmail(event, emailId) {
    event.stopPropagation();
    mailService.remove(emailId).then(() => {
      setEmails((prevEmails) =>
        prevEmails.filter((email) => email.id !== emailId)
      );
      // showSuccessMsg(`book Removed! ${emailId}`)
    });
  }

  function onChangeStar(ev, emailId) {
    ev.stopPropagation();
    // console.log('ev', ev);
    mailService.get(emailId).then((email) => {
      email.isStar = !email.isStar;
      mailService.save(email);
    });
  }

  if (!emails)
    return (
      <header>
        <EmailHeader
          className="email-header"
          filterBy={filterBy}
          onSetFilterBy={onSetFilterBy}
          state={state}
          setEmails={setEmails}
        />

        {/* <EmailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} /> */}
      </header>
    );
  return (
    <section className="main-container">
      <header className="email-header">
        <EmailHeader
          filterBy={filterBy}
          onSetFilterBy={onSetFilterBy}
          state={state}
          setEmails={setEmails}
          setShowMainHeader={setShowMainHeader}
        />
      </header>
      <section className="emails-container">
        <table className="emails-table">
          <thead>
            <tr>
              <EmailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />

              <th>
                <EmailsSort setSortKey={setSortKey} emails={emails} />
              </th>
            </tr>
          </thead>
          <tbody>
            <MailList
              changeStar={onChangeStar}
              state={state}
              emails={emails}
              onRemove={onRemoveEmail}
            />
          </tbody>
        </table>
      </section>

      <section>
        <Outlet />
      </section>
    </section>
  );
}
