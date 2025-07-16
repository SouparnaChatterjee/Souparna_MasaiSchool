import Heatmap from 'react-calendar-heatmap';

<Heatmap
  startDate={new Date('2024-01-01')}
  endDate={new Date()}
  values={entries.map(entry => ({
    date: entry.date,
    count: 1,
  }))}
/>
