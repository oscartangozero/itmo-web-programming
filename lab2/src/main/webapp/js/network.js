export function emptyRequestFactory(destination, method) {
    return () => fetch(destination, {method});
}

export function formRequestFactory(destination, method) {
    switch (method.toUpperCase()) {
        case 'GET':
            return (data) => {
                const params = new URLSearchParams(data);
                return fetch(`${destination}?${params}`, {method});
            }
        case 'POST':
            return (data) => {
                const formData = new FormData();
                for (const [key, value] of data) formData.set(key, value);
                return fetch(destination, {method, body: formData});
            }
        default:
            return null;
    }
}