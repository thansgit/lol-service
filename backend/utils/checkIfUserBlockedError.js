const checkIfUserBlockedError = user => {
    if (user?.isBlocked) {
        throw new Error(`Access denied. ${user?.nickName} is blocked.`)
    }
};

module.exports = checkIfUserBlockedError;