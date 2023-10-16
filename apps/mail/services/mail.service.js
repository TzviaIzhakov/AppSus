// mail service
import { func } from 'prop-types';
import { storageService } from '../../../services/async-storage.service.js';
import { utilService } from '../../../services/util.service.js';

export const mailService = {
  getEmails,
  get,
  save,
  remove,
  getDefaultFilter,
  getEmptyEmail,
  saveSent,
  getSentEmails,
  getStarEmails,
  sentEmailCount,
  inboxEmailCount,
  getTrashEmails,
  saveDraft,
  getDraft
};
const MAILS_KEY = 'mailsDB';
const DRAFT_KEY = 'draftDB'


_createEmails();

function _createEmails() {
  let emails = utilService.loadFromStorage(MAILS_KEY);
  if (!emails || !emails.length) {
    emails = [
      {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'maomo@momo.com',
        to: 'user@appsus.com',
        isStar: false
      },
      {
        id: 'e102',
        subject: 'Hello!',
        body: 'Would love to See you',
        isRead: true,
        sentAt: 1681188930210,
        removedAt: null,
        from: 'bomo@momo.com',
        to: 'user@appsus.com',
        isStar: false
      },
      {
        id: 'e103',
        subject: 'You got a new booking!',
        body: utilService.makeLorem(),
        isRead: false,
        sentAt: 1681130930210,
        removedAt: null,
        from: 'cixbookings.com',
        to: 'user@appsus.com',
        isStar: false
      },
      {
        id: 'e104',
        subject: 'TzviaIzhakov invited you to TzviaIzhakov/AppSus!',
        body: utilService.makeLorem(),
        isRead: false,
        sentAt: 1691135030210,
        removedAt: null,
        from: 'dzviaIzhakov',
        to: 'user@appsus.com',
        isStar: false
      },
      {
        id: 'e105',
        subject: 'TzviaIzhakov invited you to TzviaIzhakov/AppSus!',
        body: utilService.makeLorem(),
        isRead: false,
        sentAt: 1681190030210,
        removedAt: null,
        from: 'TzviaIzhakov',
        to: 'user@appsus.com',
        isStar: false
      },
      {
        id: 'e107',
        subject: utilService.makeLorem(5),
        body: `Hi Amir,

        Here you have the one time verification code that you have requested to access your user account:
        
        838676
        
        This code expires in 5 minutes.
        
        If you didn't attempt this action, please contact the Barcelonista Support Office by email at oab@fcbarcelona.cat or by calling 902 1899 00.`,
        isRead: false,
        sentAt: 1691130030210,
        removedAt: null,
        from: 'FC Barcelona',
        to: 'user@appsus.com',
        isStar: false
      },
      {
        id: 'e108',
        subject: utilService.makeLorem(5),
        body: `Hi Amir,

        Here you have the one time verification code that you have requested to access your user account:
        
        838676
        
        This code expires in 5 minutes.
        
        If you didn't attempt this action, please contact the Barcelonista Support Office by email at oab@fcbarcelona.cat or by calling 902 1899 00.`,
        isRead: false,
        sentAt: 1501130030210,
        removedAt: null,
        from: 'FC Barcelona',
        to: 'user@appsus.com',
        isStar: false
      },
      {
        id: 'e109',
        subject: utilService.makeLorem(5),
        body: `Hi Amir,

        Here you have the one time verification code that you have requested to access your user account:
        
        838676
        
        This code expires in 5 minutes.
        
        If you didn't attempt this action, please contact the Barcelonista Support Office by email at oab@fcbarcelona.cat or by calling 902 1899 00.`,
        isRead: false,
        sentAt: 1491190031410,
        removedAt: null,
        from: 'FC Barcelona',
        to: 'user@appsus.com',
        isStar: false
      },
      {
        id: 'e110',
        subject: utilService.makeLorem(5),
        body: `Hi Amir,

        Here you have the one time verification code that you have requested to access your user account:
        
        838676
        
        This code expires in 5 minutes.
        
        If you didn't attempt this action, please contact the Barcelonista Support Office by email at oab@fcbarcelona.cat or by calling 902 1899 00.`,
        isRead: false,
        sentAt: 1597130039210,
        removedAt: null,
        from: 'FC Barcelona',
        to: 'user@appsus.com',
        isStar: false,
        isTrash: false
      },
      {
        id: 'e111',
        subject: utilService.makeLorem(5),
        body: `Hi Amir,

        Here you have the one time verification code that you have requested to access your user account:
        
        838676
        
        This code expires in 5 minutes.
        
        If you didn't attempt this action, please contact the Barcelonista Support Office by email at oab@fcbarcelona.cat or by calling 902 1899 00.`,
        isRead: false,
        sentAt: 1661630030210,
        removedAt: null,
        from: 'FC Barcelona',
        to: 'user@appsus.com',
        isStar: false,
        isTrash: false
      },
      {
        id: 'e112',
        subject: utilService.makeLorem(5),
        body: `Hi Amir,

        Here you have the one time verification code that you have requested to access your user account:
        
        838676
        
        This code expires in 5 minutes.
        
        If you didn't attempt this action, please contact the Barcelonista Support Office by email at oab@fcbarcelona.cat or by calling 902 1899 00.`,
        isRead: false,
        sentAt: 1431130030210,
        removedAt: null,
        from: 'Ali Express',
        to: 'user@appsus.com',
        isStar: false,
        isTrash: false
      },
      {
        id: 'e113',
        subject: utilService.makeLorem(5),
        body: `Hi Amir,

        Here you have the one time verification code that you have requested to access your user account:
        
        838676
        
        This code expires in 5 minutes.
        
        If you didn't attempt this action, please contact the Barcelonista Support Office by email at oab@fcbarcelona.cat or by calling 902 1899 00.`,
        isRead: false,
        sentAt: 1659130030210,
        removedAt: null,
        from: 'dropBox',
        to: 'user@appsus.com',
        isStar: false,
        isTrash: false
      },
      {
        id: 'e114',
        subject: utilService.makeLorem(5),
        body: `Hi Amir,

        Here you have the one time verification code that you have requested to access your user account:
        
        838676
        
        This code expires in 5 minutes.
        
        If you didn't attempt this action, please contact the Barcelonista Support Office by email at oab@fcbarcelona.cat or by calling 902 1899 00.`,
        isRead: false,
        sentAt: 1709130030210,
        removedAt: null,
        from: 'dropBox',
        to: 'user@appsus.com',
        isStar: false,
        isTrash: false
      },

    ];
    utilService.saveToStorage(MAILS_KEY, emails);
  }
}

const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus',
};
function getEmails(filterBy = {}, key) {
  return storageService.query(MAILS_KEY).then((emails) => {
    emails = emails.filter(email => email.from !== loggedinUser.email && !email.isTrash)
    console.log(emails);
    if (filterBy.subject) {
      const regex = new RegExp(filterBy.subject, 'i');
      emails = emails.filter((email) => regex.test(email.subject));
    }
    if (filterBy.isRead) {
      emails = emails.filter(email => email.isRead === true)

    }
    sortBy(emails, key)
    return emails;
  });
}
function getSentEmails(filterBy = {}, key) {
  return storageService.query(MAILS_KEY).then((emails) => {
    emails = emails.filter(email => email.from === loggedinUser.email && !email.isTrash)
    console.log(emails);
    if (filterBy.subject) {
      const regex = new RegExp(filterBy.subject, 'i');
      emails = emails.filter((email) => regex.test(email.subject));
    }
    sortBy(emails, key)
    return emails;
  });
}

function getStarEmails(filterBy = {}, key) {
  return storageService.query(MAILS_KEY).then((emails) => {
    emails = emails.filter(email => email.isStar === true && !email.isTrash)
    if (filterBy.subject) {
      const regex = new RegExp(filterBy.subject, 'i');
      emails = emails.filter((email) => regex.test(email.subject));
    }
    if (filterBy.isRead) {
      emails = emails.filter(email => email.isRead === true)
    }
    sortBy(emails, key)
    return emails
  })
}
function getTrashEmails(filterBy = {}, key) {
  return storageService.query(MAILS_KEY).then((emails) => {
    emails = emails.filter(email => email.isTrash === true)
    if (filterBy.subject) {
      const regex = new RegExp(filterBy.subject, 'i');
      emails = emails.filter((email) => regex.test(email.subject));
    }
    if (filterBy.isRead) {
      emails = emails.filter(email => email.isRead === true)
    }
    console.log(emails,'trash');
    sortBy(emails, key)
    return emails
  })
}

function get(id) {
  return storageService.get(MAILS_KEY, id);
}

function save(email) {
  if (email.id) {
    return storageService.put(MAILS_KEY, email);
  } else {
    return storageService.post(MAILS_KEY, email);
  }
}

function remove(emailId) {
  return get(emailId).then(email => {
    // console.log(email.isTrash);
    if (!email.isTrash) {
      email.isTrash = true
      save(email)
    }
   else if (email.isTrash) storageService.remove(MAILS_KEY, emailId);

  })
}

function getDefaultFilter() {
  return { subject: '', isRead: false };
}

function getEmptyEmail() {
  return {
    subject: '',
    body: '',
    sentAt: Date.now(),
    from: 'user@appsus.com',
    to: '',
  }
}

function saveSent(email) {
  return storageService.post(MAILS_KEY, email)
    .then(() =>
      getSentEmails()
    )
}


function sentEmailCount() {
  return storageService.query(MAILS_KEY).then((emails) => {
    emails = emails.filter(email => email.from === loggedinUser.email)
    console.log(emails);
    return emails.length
  })
}

function inboxEmailCount() {
  return storageService.query(MAILS_KEY).then((emails) => {
    emails = emails.filter(email => email.from !== loggedinUser.email)
    console.log(emails);
    return emails.length

  })

}

function sortBy(emails, key, dir = 1) {
  const isInt = ['from', 'to']
  isInt.includes(key)
    ? emails.sort((a, b) => a[key].localeCompare(b[key]) * dir)
    : emails.sort((a, b) => (a[key] - b[key]) * dir)
  return emails
}

function saveDraft(email) {
if(!email)return
  if (email.id) {
    return storageService.put(DRAFT_KEY, email);
  } else {

    return storageService.post(DRAFT_KEY, email);
  }
}

function getDraft() {
  return storageService.query(DRAFT_KEY)
  .then(email => (email[0]))
}

//  storageService.post(DRAFT_KEY, getEmptyEmail())