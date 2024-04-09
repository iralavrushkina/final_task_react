const fetchPOST = (data: any, path: string, url: string) =>
    fetch(new URL(path, url), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
export default fetchPOST;
