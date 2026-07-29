import { randomUUID } from "crypto";

const sessions = new Map();

function login(email) {

    const sessionId = randomUUID();

    sessions.set(sessionId, email);

    return sessionId;
}

function getProfile(sessionId) {

    return sessions.get(sessionId);
}

const session = login("alice@gmail.com");

console.log("Session ID:", session);

console.log("Logged in User:");

console.log(getProfile(session));