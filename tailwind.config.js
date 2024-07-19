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
          scheduled: '#FF934B',  // orange-500
          ongoing: '#4299e1',    // blue-500
          completed: '#48bb78',  // green-500
          cancelled: '#f56565',  // red-500
        },
      },
    }
  },
  plugins: [],
}
