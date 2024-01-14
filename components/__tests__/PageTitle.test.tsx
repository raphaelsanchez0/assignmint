import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import date from "date-and-time";

import PageTitle from "@/components/PageTitle";

describe("PageTitle", () => {
  it("Renders the text 'Dashboard'", () => {
    const text = "Dashboard";
    render(<PageTitle title={text} />);

    const myElement = screen.getByText(text);
    expect(myElement).toBeInTheDocument();
  });

  it("Renders the current day", () => {
    const mockDate = new Date();
    const formattedDate = date.format(mockDate, "MMMM DD, YYYY");
    render(<PageTitle title="Test Title" />);

    const dateElement = screen.getByText(formattedDate);
    expect(dateElement).toBeInTheDocument();
  });
});
