import { fireEvent, render, screen } from '@testing-library/react';
import LazyImage from './LazyImage';

test('reserves the image dimensions and fades the image in after loading', () => {
  render(
    <LazyImage
      src="/images/example.jpg"
      alt="Example portrait"
      width={320}
      height={240}
      wrapperClassName="h-60 w-80"
    />
  );

  const wrapper = screen.getByRole('img', { name: 'Example portrait' }).parentElement;
  const image = screen.getByRole('img', { name: 'Example portrait' });
  expect(wrapper).toHaveAttribute('aria-busy', 'true');
  expect(image).toHaveAttribute('width', '320');
  expect(image).toHaveAttribute('height', '240');
  expect(document.querySelector('.skeleton-shimmer')).toBeInTheDocument();

  fireEvent.load(image);

  expect(wrapper).toHaveAttribute('aria-busy', 'false');
  expect(image).toHaveClass('opacity-100');
  expect(document.querySelector('.skeleton-shimmer')).not.toBeInTheDocument();
});

test('shows a neutral alt-text placeholder when an image fails', () => {
  render(<LazyImage src="/images/missing.jpg" alt="Unavailable project preview" />);
  fireEvent.error(screen.getByRole('img', { name: 'Unavailable project preview' }));

  expect(screen.getByRole('img', { name: 'Unavailable project preview' })).toHaveTextContent(
    'Unavailable project preview'
  );
  expect(document.querySelector('.skeleton-shimmer')).not.toBeInTheDocument();
});
