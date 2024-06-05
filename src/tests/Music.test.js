import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Music from '../components/Music';

const releases = [
  { title: 'Happy Loop', releaseType: 'Single', releaseDate: '2023-05-01', imageUrl: 'happy-loop.jpg' },
  { title: 'Joy Ride', releaseType: 'Album', releaseDate: '2023-05-02', imageUrl: 'joy-ride.jpg' }
];

test('renders music releases', () => {
  render(<Music releases={releases} onReleaseSelect={jest.fn()} />);
  const firstRelease = screen.getByText(/Happy Loop/i);
  const secondRelease = screen.getByText(/Joy Ride/i);
  expect(firstRelease).toBeInTheDocument();
  expect(secondRelease).toBeInTheDocument();
});

test('calls onReleaseSelect when a release is clicked', () => {
  const handleReleaseSelect = jest.fn();
  render(<Music releases={releases} onReleaseSelect={handleReleaseSelect} />);
  const firstRelease = screen.getByText(/Happy Loop/i);
  fireEvent.click(firstRelease);
  expect(handleReleaseSelect).toHaveBeenCalledWith(releases[0]);
});
