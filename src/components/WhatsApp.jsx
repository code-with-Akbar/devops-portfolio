// Floating WhatsApp button (bottom-right). Number is in international format, no "+" or leading 0.
const NUMBER = '923157539293'
const MESSAGE = 'Hi Hassan, I found your portfolio and would like to connect.'

export default function WhatsApp() {
  return (
    <a className="wa" href={`https://wa.me/${NUMBER}?text=${encodeURIComponent(MESSAGE)}`}
      target="_blank" rel="noopener noreferrer" aria-label="Chat with Hassan on WhatsApp">
      <span className="wa-tip">Chat on WhatsApp</span>
      <span className="wa-ring" aria-hidden="true" />
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path fill="currentColor" d="M16.04 3C9.4 3 4 8.4 4 15.03c0 2.12.55 4.18 1.6 6L4 29l8.18-1.57a12.03 12.03 0 0 0 5.86 1.5h.01C24.7 28.93 30 23.6 30 16.97 30 10.4 24.67 3 16.04 3Zm0 22.9h-.01a10 10 0 0 1-5.1-1.4l-.37-.22-4.85.93.98-4.73-.24-.39a9.97 9.97 0 0 1-1.53-5.3C4.92 9.4 9.9 5 16.05 5c3 0 5.8 1.17 7.9 3.3a10.9 10.9 0 0 1 3.27 7.8c0 5.5-4.5 9.8-9.18 9.8Zm5.5-7.4c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.65-.93-2.25-.24-.58-.5-.5-.68-.5h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.1 3.2 5.08 4.5.7.3 1.26.48 1.7.62.72.23 1.37.2 1.88.12.57-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.12-.28-.2-.58-.35Z" />
      </svg>
    </a>
  )
}
