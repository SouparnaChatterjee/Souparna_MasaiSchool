function generateInsights(entries) {
  // Analyze patterns over the week
  const avgSleep = entries.reduce((a, b) => a + b.sleepHours, 0) / entries.length;
  if (avgSleep < 6) return 'Try sleeping at least 7 hours for better focus.';
  return 'Great job keeping up your sleep schedule!';
}

module.exports = generateInsights;
