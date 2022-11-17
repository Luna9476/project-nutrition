export default function authHeader() {
    let userItem = localStorage.getItem("user");

    if (userItem) {
        const user = JSON.parse(userItem);
        if (user) {
            return { 'x-access-tokens':  user };
        }
    }
    return {};
}