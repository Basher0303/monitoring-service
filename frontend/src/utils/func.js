function debounce(ms) {
    let timeout;
    return function(method, ...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => method.apply(this, args), ms);
    };
}

export {debounce}