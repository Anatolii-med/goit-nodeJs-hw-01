const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
	// ...твой код
	const response = await fs.readFile(contactsPath);
	const allContacts = JSON.parse(response);
	return allContacts;
}

async function getContactById(contactId) {
	const response = await listContacts();
	const result = response.find((item) => item.id === contactId);

	if (!result) {
		return null;
	}

	return result;
}

async function removeContact(contactId) {
	// ...твой код
	const response = await listContacts();
	const idx = response.findIndex((item) => item.id === contactId);
	const cutContact = response.splice(idx, 1);
	await fs.writeFile(contactsPath, JSON.stringify(response));

	console.table(cutContact);
	console.table(response);
}

async function addContact(name, email, phone) {
	const contacts = await listContacts();
	const newContact = { name: name, email: email, phone: phone, id: v4() };
	contacts.push(newContact);
	console.log("newContact", newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts));
	console.table(contacts);
	return newContact;
}

module.exports = { addContact, listContacts, getContactById, removeContact };
