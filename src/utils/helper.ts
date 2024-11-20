export const reFetchPage = (page: number) => {
    // Update the Url and trigger SSR
    const query = new URLSearchParams(window.location.search);
    query.set("page", page.toString());
    window.location.search = query.toString(); // This will trigger SSR refetch
}