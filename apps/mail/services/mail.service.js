// mail service
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
  getStarEmails
};
const MAILS_KEY = 'mailsDB';

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
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        isStar: false
      },
      {
        id: 'e102',
        subject: 'Hello!',
        body: 'Would love to See you',
        isRead: true,
        sentAt: 1551138930210,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        isStar: false
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
        isStar: false
      },
      {
        id: 'e104',
        subject: 'TzviaIzhakov invited you to TzviaIzhakov/AppSus!',
        body: utilService.makeLorem(),
        isRead: false,
        sentAt: 1551135030210,
        removedAt: null,
        from: 'TzviaIzhakov',
        to: 'user@appsus.com',
        isStar: false
      },
      {
        id: 'e105',
        subject: 'TzviaIzhakov invited you to TzviaIzhakov/AppSus!',
        body: utilService.makeLorem(),
        isRead: false,
        sentAt: 1551130030210,
        removedAt: null,
        from: 'TzviaIzhakov',
        to: 'user@appsus.com',
        isStar: false
      },
      {
        id: 'e106',
        subject: 'Your verification code',
        body:`Hi Amir,

        Here you have the one time verification code that you have requested to access your user account:
        
        838676
        
        This code expires in 5 minutes.
        
        If you didn't attempt this action, please contact the Barcelonista Support Office by email at oab@fcbarcelona.cat or by calling 902 1899 00.`,
        isRead: false,
        sentAt: 1551130030210,
        removedAt: null,
        from: 'FC Barcelona',
        to: 'user@appsus.com',
        isStar: false
      },
      
    ];
    utilService.saveToStorage(MAILS_KEY, emails);
  }
}

const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus',
};
function getEmails(filterBy = {}) {
  return storageService.query(MAILS_KEY).then((emails) => {
    emails= emails.filter(email=> email.from!==loggedinUser.email)
    console.log(emails);
    if (filterBy.subject) {
      const regex = new RegExp(filterBy.subject, 'i');
      emails = emails.filter((email) => regex.test(email.subject));
    }
    if(filterBy.isRead){
    emails= emails.filter(email=> email.isRead===true)

    }
  
    return emails;
  });
}
function getSentEmails(filterBy = {}) {
  return storageService.query(MAILS_KEY).then((emails) => {
  emails= emails.filter(email=> email.from===loggedinUser.email)
  console.log(emails);
    if (filterBy.subject) {
      const regex = new RegExp(filterBy.subject, 'i');
      emails = emails.filter((email) => regex.test(email.subject));
    }
   
    return emails;
  });
}

function getStarEmails(filterBy = {}){
  return storageService.query(MAILS_KEY).then((emails) => {
    emails=emails.filter(email=> email.isStar===true)
    if (filterBy.subject) {
      const regex = new RegExp(filterBy.subject, 'i');
      emails = emails.filter((email) => regex.test(email.subject));
    }
    if(filterBy.isRead){
    emails= emails.filter(email=> email.isRead===true)
    }
  
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
  return storageService.remove(MAILS_KEY, emailId);
}

function getDefaultFilter() {
  return { subject: '', isRead: false };
}

function getEmptyEmail(){
  return{
  
    subject: '',
    body: '',
    sentAt: Date.now(),
    from: 'user@appsus.com',
    to: '',
  }
}

function saveSent(email) {
  return storageService.post(MAILS_KEY, email);
}