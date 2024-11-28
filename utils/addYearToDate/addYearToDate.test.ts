import { describe, expect, test, vi, beforeEach, it } from "vitest";
import { addYearToDate } from "./addYearToDate";

function normalizeHours(date1: Date, date2: Date) {
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);
}

describe("addYearToDate Utilities", () => {
    let defaultDateWithNoYear: Date;
    let mockSystemDate: Date;

    beforeEach(() => {
        vi.useFakeTimers();
        defaultDateWithNoYear = new Date(2001, 0);
    });

    describe("Current date is in November", () => {
        beforeEach(() => {
            mockSystemDate = new Date("November 26, 2024 03:24:00");
            vi.setSystemTime(mockSystemDate);
        });

        it("Date with no year is first day of the year.", () => {
            defaultDateWithNoYear.setMonth(0, 1); // Set to first day of the year
            const expectedDate = new Date(defaultDateWithNoYear);
            expectedDate.setFullYear(2025); // Set to next year since it would be in the past if not

            const actual = addYearToDate(defaultDateWithNoYear);

            normalizeHours(actual, expectedDate);

            expect(actual).toStrictEqual(expectedDate);
        });

        it("Date with no year is yesterday.", () => {
            const noYearYesterday = new Date(defaultDateWithNoYear);
            const november = 10;
            const yesterdayDate = 25;

            noYearYesterday.setMonth(november, yesterdayDate);

            const expectedDate = new Date(noYearYesterday);
            expectedDate.setFullYear(2025);

            const actual = addYearToDate(noYearYesterday);

            normalizeHours(actual, expectedDate);

            expect(actual).toStrictEqual(expectedDate);
        });

        it("No year date is December 31.", () => {
            const noYearDecember = new Date(defaultDateWithNoYear);
            const december = 11; // December is 11 in zero-based index
            const newYearsEve = 31;
            noYearDecember.setMonth(december, newYearsEve);

            // Expected date should be December 31 of the current year
            const expectedDate = new Date(noYearDecember);
            expectedDate.setFullYear(mockSystemDate.getFullYear());

            const actual = addYearToDate(noYearDecember);

            normalizeHours(actual, expectedDate);

            expect(actual).toStrictEqual(expectedDate);
        });
    });

    describe("Current date is first day of the year", () => {
        beforeEach(() => {
            mockSystemDate = new Date("January 1, 2024 03:24:00");
            vi.setSystemTime(mockSystemDate);
        });

        it("No year date is December 31.", () => {
            const noYearLastDayOfYear = new Date(defaultDateWithNoYear);
            const december = 11; // December is 11 in zero-based index
            const newYearsEve = 31;
            noYearLastDayOfYear.setMonth(december, newYearsEve);

            const expectedDate = new Date(noYearLastDayOfYear);
            expectedDate.setFullYear(2024); // Dec 31 belongs to the previous year

            const actual = addYearToDate(noYearLastDayOfYear);

            normalizeHours(actual, expectedDate);

            expect(actual).toStrictEqual(expectedDate);
        });

        it("No year date is February 29 (Leap Year Scenario).", () => {
            const noYearLeapDay = new Date(defaultDateWithNoYear);
            const february = 1; // February is 1 in zero-based index
            const leapDay = 29;
            noYearLeapDay.setMonth(february, leapDay);

            // Expected date should be February 29 of the next leap year (2024 in this case)
            const expectedDate = new Date(noYearLeapDay);
            expectedDate.setFullYear(2024);

            const actual = addYearToDate(noYearLeapDay);

            normalizeHours(actual, expectedDate);

            expect(actual).toStrictEqual(expectedDate);
        });
    });

    describe("Current date is December 31", () => {
        beforeEach(() => {
            mockSystemDate = new Date("December 31, 2024 23:59:59");
            vi.setSystemTime(mockSystemDate);
        });

        it("No year date is January 2.", () => {
            const noYearJanuary = new Date(defaultDateWithNoYear);
            const january = 0; // January is 0 in zero-based index
            const secondDay = 2;
            noYearJanuary.setMonth(january, secondDay);

            // Expected date should remain in the next year (2025)
            const expectedDate = new Date(noYearJanuary);
            expectedDate.setFullYear(2025);

            const actual = addYearToDate(noYearJanuary);

            normalizeHours(actual, expectedDate);

            expect(actual).toStrictEqual(expectedDate);
        });
    });

    describe("General Cases", () => {
        it("No year date is exactly today.", () => {
            const today = new Date()
            today.setFullYear(2001)
            const noYearToday = new Date(today)
            
            vi.setSystemTime(new Date())

            
            const expectedDate = new Date()

            const actual = addYearToDate(noYearToday);

            normalizeHours(actual, expectedDate);

            expect(actual).toStrictEqual(expectedDate);
        });
    });
});