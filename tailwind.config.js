/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'header-color': '#FFEBA2',
        'button-color': '#F7C245',
        'time-col-color': '#FFF5D0',
        meeting: {
          scheduled: '#FF934B',
          ongoing: '#4299e1',
          completed: '#00C48C',
          cancelled: '#f56565',
          scheduledBg: '#FFF1E9',
          ongoingBg: '#e2f8fd',
          completedBg: '#D9F6EE',
          cancelledBg: '#ffe7e7',
        },
      },
    }
  },
  plugins: [],
}
