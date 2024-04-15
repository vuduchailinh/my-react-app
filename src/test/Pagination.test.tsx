import {Pagination} from "../components/Pagination.tsx";
import {
    fireEvent,
    render
} from "@testing-library/react";
import '@testing-library/jest-dom';

// Test rendering Pagination component
test('renders Pagination component with correct props', () => {
    const totalPages = 3;
    const {getByText} = render(
        <Pagination
            page={1}
            totalPages={totalPages}
            onNextClick={jest.fn()}
            onSpecificPageClick={jest.fn()}
            onPreviousClick={jest.fn()}
        />
    );

    expect(getByText('Next')).toBeDefined();
    expect(getByText('1')).toBeDefined();
    expect(getByText('2')).toBeDefined();
    expect(getByText('3')).toBeDefined();
    expect(getByText('Previous')).toBeDefined();
})

// Test behavior of Next button when clicked
test('calls onNextClick when Next button is clicked', () => {
    const onNextClick = jest.fn();
    const {getByText} = render(
        <Pagination
            page={1}
            totalPages={3}
            onNextClick={onNextClick}
            onSpecificPageClick={jest.fn()}
            onPreviousClick={jest.fn()}
        />
    );
    fireEvent.click(getByText('Next'));
    expect(onNextClick).toHaveBeenCalled();
})
//
// // Test behavior of Previous button when clicked
test('calls onPreviousClick when Previous button is clicked', () => {
    const onPreviousClick = jest.fn();
    const {getByText} = render(
        <Pagination
            page={2}
            totalPages={3}
            onNextClick={jest.fn()}
            onSpecificPageClick={jest.fn()}
            onPreviousClick={onPreviousClick}
        />
    );
    fireEvent.click(getByText('Previous'));
    expect(onPreviousClick).toHaveBeenCalled();
})

// Test behavior of specific page button when clicked
test('calls onSpecificPageClick when specific page button is clicked', () => {
    const onSpecificPageClick = jest.fn();
    const {getByText} = render(
        <Pagination
            page={2}
            totalPages={3}
            onNextClick={jest.fn()}
            onSpecificPageClick={onSpecificPageClick}
            onPreviousClick={jest.fn()}
        />
    );
    fireEvent.click(getByText('3'));
    expect(onSpecificPageClick).toHaveBeenCalledWith(3);
})

// Test disabled Next button when page is equal to totalPages
test('disables Next button when page is equal to totalPages', () => {
    const {getByText} = render(
        <Pagination
            page={3}
            totalPages={3}
            onNextClick={jest.fn()}
            onSpecificPageClick={jest.fn()}
            onPreviousClick={jest.fn()}
        />
    );
    expect(getByText('Next')).toBeDisabled();
})

// Test disabled Previous button when page is equal to 1
test('disables Previous button when page is equal to 1', () => {
    const {getByText} = render(
        <Pagination
            page={1}
            totalPages={3}
            onNextClick={jest.fn()}
            onSpecificPageClick={jest.fn()}
            onPreviousClick={jest.fn()}
        />
    );
    expect(getByText('Previous')).toBeDisabled();
})