
const getMatchedUserInfo = (users, userLoggedId) => {
    const newUsers = {...users };

    delete newUsers[userLoggedId];

    const [ id, user ] = Object.entries(newUsers).flat();

    return { id, ...user };
}

export default getMatchedUserInfo;