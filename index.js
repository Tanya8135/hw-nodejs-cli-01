const contacts = require('./contacts');
const { program } = require('commander');

program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case 'list':
            const allContacts = await contacts.listContacts();
            console.log("List all contacts:");
            return console.table(allContacts);

        case 'get':
            const contact = await contacts.getContactById(id);
            return console.table(contact);

        case 'add':
            const newContact = await contacts.addContact(name, email, phone);
            console.log(`Add a new contact name: ${name}, email: ${email}, phone: ${phone} added`);
            return console.table(newContact);

        case 'remove':
            const removeContact = await contacts.removeContact(id);
            console.log(`Remove a contact by ID: ${id}`);
            return console.table(removeContact);
        default:
            return console.warn('\x1B[31m Unknown action type!');
    }
};

invokeAction(program.opts());