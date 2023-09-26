interface Quote {
    _id: string;
    author: string;
    content: string;
    tags: string[];
    authorSlug: string;
    length: number;
    dateAdded: string;
    dateModified: string;
}

interface ListQuoteResponse {
    count: number;
    totalCount: number;
    page: number;
    totalPages: number;
    lastItemIndex: number;
    results: Quote[];
}

export default ListQuoteResponse;