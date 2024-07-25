

const has24HoursPassed = (lastLoginDate, currentLoginDate) => {
    const lastLoginTime = new Date(lastLoginDate).getTime();
    const currentLoginTime = new Date(currentLoginDate).getTime();

    const differenceInMs = currentLoginTime - lastLoginTime;

    const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

    return differenceInMs >= twentyFourHoursInMs;
};

module.exports = {
    has24HoursPassed,
}