// mail service
import { storageService } from '../../../services/async-storage.service.js';
import { utilService } from '../../../services/util.service.js';

export const mailService = {
<<<<<<< HEAD
    getEmails,
    get,
    save,
    remove,
    getDefaultFilter
}
const Mails_KEY = 'mailsDB'
=======
  getEmails,
  get,
  save,
  remove,
};
const Mails_KEY = 'mailsDB';
>>>>>>> b1186c7e5e1e99ca94a91bd51a79e7e08fc7b4ad

const emails = [
  {
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'momo@momo.com',
    to: 'user@appsus.com',
  },
  {
    id: 'e102',
    subject: 'Hello!',
    body: 'Would love to See you',
    isRead: true,
    sentAt: 1551133930210,
    removedAt: null,
    from: 'momo@momo.com',
    to: 'user@appsus.com',
  },
  {
    id: 'e103',
    subject: 'You got a new booking!',
    body: utilService.makeLorem(),
    isRead: false,
    sentAt: 1551130930210,
    removedAt: null,
    from: 'wixbookings.com',
    to: 'user@appsus.com',
  },
  {
    id: 'e104',
    subject: 'TzviaIzhakov invited you to TzviaIzhakov/AppSus!',
    body: utilService.makeLorem(),
    isRead: false,
    sentAt: 1551130030210,
    removedAt: null,
    from: 'TzviaIzhakov',
    to: 'user@appsus.com',
  },
];

<<<<<<< HEAD
]

//  utilService.saveToStorage(Mails_KEY,emails)
=======
// utilService.saveToStorage(Mails_KEY, emails);
>>>>>>> b1186c7e5e1e99ca94a91bd51a79e7e08fc7b4ad

const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus',
};

<<<<<<< HEAD
function getEmails(filterBy = {}) {
    return storageService.query(Mails_KEY)
        .then(emails => {
            console.log(emails);
            if (filterBy.subject) {
                const regex = new RegExp(filterBy.subject, 'i')
                emails = emails.filter(email => regex.test(email.subject))
            }
            if (filterBy.isRead) {
                emails = emails.filter(email => email.isRead === true)
            }
            return emails
        })
}

function get(id) {
    return storageService.get(Mails_KEY, id)
}

function save(email) {
    if (email.id) {
        return storageService.put(Mails_KEY, email)
    } else {
        return storageService.post(Mails_KEY, email)
    }
}

function remove(emailId) {
    return storageService.remove(Mails_KEY, emailId)
}

function getDefaultFilter() {
    return { subject: '', isRead: false }
}
=======
function getEmails() {
  return storageService.query(Mails_KEY);
}

function get(id) {
  return storageService.get(Mails_KEY, id);
}

function save(email) {
  if (email.id) {
    return storageService.put(Mails_KEY, email);
  } else {
    return storageService.post(Mails_KEY, email);
  }
}

function remove(emailId) {
  return storageService.remove(Mails_KEY, emailId);
}
>>>>>>> b1186c7e5e1e99ca94a91bd51a79e7e08fc7b4ad
