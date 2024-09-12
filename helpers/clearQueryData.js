const clearQueryData = (queryObj) => {
    return Object.fromEntries(
        Object.entries(queryObj).filter(([_, value]) => value !== null && value !== undefined)
    );
};

export default clearQueryData;
