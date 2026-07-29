function logRequest(method, url) {

    console.log(`[${new Date().toLocaleTimeString()}] ${method} ${url}`);

}

logRequest("GET", "/students");

logRequest("POST", "/login");

logRequest("DELETE", "/students/2");