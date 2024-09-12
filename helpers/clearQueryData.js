const clearQueryData = (queryObj) => {
    return Object.fromEntries(
        Object.entries(queryObj).filter(([_, value]) => !!value)
    );
};

export default clearQueryData;
