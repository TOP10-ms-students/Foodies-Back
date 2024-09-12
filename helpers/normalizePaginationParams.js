export const normalizePaginationParams = (page = 1, limit = 10) => {
    const normalizedLimit = Number(limit);
    const offset = (Number(page) - 1) * normalizedLimit;

    return {
        limit: normalizedLimit,
        offset,
    };
};
