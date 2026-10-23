import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import HomePage from './pages/HomePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ThemeProvider from './theme/ThemeProvider';
import Contact from './components/sections/Contact';

jest.mock('./components/ui/DotsBackground', () => () => null);
jest.mock('@emailjs/browser', () => ({ __esModule: true, default: { send: jest.fn() } }));

beforeEach(() => {
  window.sessionStorage.clear();
  emailjs.send.mockReset();
});

test('renders the portfolio home page', async () => {
  render(
    <ThemeProvider>
      <HelmetProvider>
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <HomePage />
        </MemoryRouter>
      </HelmetProvider>
    </ThemeProvider>
  );
  expect(await screen.findByRole('heading', { name: /aman yadav/i, level: 1 })).toBeInTheDocument();
});

test('renders the dynamic Livio Live project page', async () => {
  render(
    <HelmetProvider>
      <MemoryRouter
        initialEntries={['/projects/livio-live']}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );
  expect(
    await screen.findByRole('heading', { name: /livio live - live race tracking & results/i, level: 1 })
  ).toBeInTheDocument();
  const screenshots = screen.getAllByAltText(/Livio Live mobile app screenshot/);
  expect(screenshots).toHaveLength(8);
  expect(screenshots[0]).toHaveAttribute('src', '/images/projects/livio-live-screen-1.jpg');
  expect(screen.getByRole('heading', { name: 'Key Features' })).toBeInTheDocument();
});

test('renders the supplied Djobzy screenshots in its phone showcase and gallery', async () => {
  render(
    <HelmetProvider>
      <MemoryRouter
        initialEntries={['/projects/djobzy']}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );
  expect(
    await screen.findByRole('heading', { name: /djobzy - global job portal & gig marketplace app/i, level: 1 })
  ).toBeInTheDocument();
  const screenshots = screen
    .getAllByRole('img')
    .filter((image) => image.getAttribute('src').includes('/djobzy-screen-'));
  expect(screenshots).toHaveLength(8);
  expect(screenshots[0]).toHaveAttribute('src', '/images/projects/djobzy-screen-1.jpg');
  expect(screen.getByRole('heading', { name: 'Djobzy Mobile App' })).toBeInTheDocument();
});

test('validates the required contact fields inline', async () => {
  render(<Contact />);
  await userEvent.click(screen.getByRole('button', { name: /send message/i }));
  expect(screen.getByText('Please enter your name.')).toBeInTheDocument();
  expect(screen.getByText('An email is needed so I can reply.')).toBeInTheDocument();
  expect(screen.getByText('Please enter a subject.')).toBeInTheDocument();
  expect(screen.getByText('Please enter at least 10 characters.')).toBeInTheDocument();
  expect(emailjs.send).not.toHaveBeenCalled();
});

test('sends a valid contact message and enforces the cooldown', async () => {
  process.env.VITE_EMAILJS_SERVICE_ID = ' test-service ';
  process.env.VITE_EMAILJS_TEMPLATE_ID = ' test-template ';
  process.env.VITE_EMAILJS_PUBLIC_KEY = ' test-public-key ';
  emailjs.send.mockResolvedValueOnce({ status: 200 });

  render(<Contact />);
  await userEvent.type(screen.getByLabelText('Name'), ' Aman Test ');
  await userEvent.type(screen.getByRole('textbox', { name: 'Email' }), 'test@example.com');
  await userEvent.type(screen.getByLabelText('Subject'), ' Project inquiry ');
  await userEvent.type(screen.getByLabelText('Message'), ' A message with enough characters. ');
  await userEvent.click(screen.getByRole('button', { name: /send message/i }));

  expect(await screen.findByText("Thanks! I'll reply within 24 hours.")).toBeInTheDocument();
  expect(emailjs.send).toHaveBeenCalledTimes(1);
  expect(emailjs.send).toHaveBeenCalledWith(
    'test-service',
    'test-template',
    {
      from_name: 'Aman Test',
      from_email: 'test@example.com',
      subject: 'Project inquiry',
      message: 'A message with enough characters.',
    },
    'test-public-key'
  );
  expect(window.sessionStorage.getItem('aman-portfolio-contact-cooldown')).toBeTruthy();

  await userEvent.type(screen.getByLabelText('Name'), 'Aman Test');
  await userEvent.type(screen.getByRole('textbox', { name: 'Email' }), 'test@example.com');
  await userEvent.type(screen.getByLabelText('Subject'), 'Another inquiry');
  await userEvent.type(screen.getByLabelText('Message'), 'A second message with enough characters.');
  await userEvent.click(screen.getByRole('button', { name: /send message/i }));
  expect(await screen.findByText(/Please wait \d+ seconds before sending another message\./)).toBeInTheDocument();
  expect(emailjs.send).toHaveBeenCalledTimes(1);
}, 15000);
