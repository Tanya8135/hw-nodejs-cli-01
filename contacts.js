const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

/**
 * Повернення масиву контактів
 * з contactsPath (contacts.json)
 */
async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        return contacts;
    } catch (err) {
        console.error(err.message);
        return [];
    }
}

/**
 * Повернення контакту за ідентифікатором.
 * @param {string} contactId id контакту
 * @returns {object|null}  повертає об'єкт контакту або null, якщо не знайдено контакт за id
 */
async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        const contact = contacts.find((contact) => contact.id === contactId);
        return contact || null;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

/**
 * Видалення контакту за id
 * @param {string} contactId id контакту
 * @returns {object|null} повертає об'єкт видаленого контакту або null...
 */
async function removeContact(contactId) {
    try {
        const contacts = await listContacts();
        const contactIndex = contacts.findIndex((contact) => contact.id === contactId);

        if (contactIndex === -1) {
            return null;
        }
        const removedContact = contacts.splice(contactIndex, 1)[0];
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return removedContact;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

/**
 * Додавання контакту
 * @param {string} name
 * @param {string} email
 * @param {string} phone
 * @returns {object} об'єкт контакту
 */
async function addContact(name, email, phone) {
    try {
        const contacts = await listContacts();
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone,
        };
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

module.exports = { listContacts, getContactById, addContact, removeContact };