export interface IArticle {
    uuid: string;
    ord_in_thread: number;
    author: string;
    title: string;
    text: string;
    published: Date;
    crawled: Date;
    site_url: string;
    country: string;
    domain_rank: number;
    thread_title: string;
    spam_score: number;
    main_img_url: string;
    participants_count: number;
    likes: number;
    comments: number;
    shares: number;
    type: string;
}