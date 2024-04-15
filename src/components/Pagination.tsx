import {Button, Flex} from "@radix-ui/themes";
import {generatePageNumbers} from "../utils/utils.tsx";

export type PaginationProps = {
    page: number,
    totalPages: number,
    onSpecificPageClick: (pageNumber: number) => void,
    onPreviousClick: () => void,
    onNextClick: () => void
}

export const Pagination = ({
                        page,
                        totalPages,
                        onNextClick,
                        onSpecificPageClick,
                        onPreviousClick
                    }: PaginationProps) => {
    return (
        <Flex justify={'center'} pt={'5'} gap={'1'}>
            <Button
                disabled={page >= totalPages}
                onClick={onNextClick}
            >
                Next
            </Button>
            {
                totalPages > 0 &&
                generatePageNumbers(page, totalPages)
                    .map((pageNumber, index) => {
                        return (
                            <Button
                                key={index}
                                variant={pageNumber === page ? 'classic' : 'soft'}
                                onClick={() => {
                                    if ('...' === pageNumber) {
                                        return
                                    }
                                    return onSpecificPageClick(Number(pageNumber))
                                }}
                            >
                                {pageNumber}
                            </Button>
                        )
                    })
            }
            <Button
                disabled={page <= 1}
                onClick={onPreviousClick}
            >
                Previous
            </Button>
        </Flex>
    )
}