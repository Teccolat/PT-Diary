import '@testing-library/jest-dom/extend-expect'
import React from "react";
import App from '../App';
import { render, screen } from '@testing-library/react';

test("Renders title 'Your Personal Trainer Diary' ", () => { 
    render(<App/>);
    const title =screen.getByTestId("HeaderTitle");
    // console.log(title)
    expect(title).toBeInTheDocument();
 })

// test("should render App correctly and display welcome text after determining if 'output' contains data", () => { 
//     const {container} = render(<App/>);
//     expect(container.innerHTML).toMatch("Welcome! Please enter a search term above and click 'Search'.");
//  })