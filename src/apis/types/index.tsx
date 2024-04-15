export type Pageable<T> = {
    data: T[]
    first: number
    items: number
    last: number
    next: number
    pages: number
    prev: number
}