// mail service
import { storageService } from '../../../services/async-storage.service.js';

export const mailService={
    getEmails
}

const emails = [
    {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e102',
        subject: 'Hello!',
        body: 'Would love to See you',
        isRead: true,
        sentAt: 1551133930210,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    }
]
const loggedinUser = {
    email: 'user@appsus.com', fullname: 'Mahatma Appsus'
}

function getEmails() {
    return Promise.resolve(emails)
}