export default defineEventHandler((event) => {
  // Dummy data for trending series
  const manga = {
    id: 2,
    title: 'Jujutsu Kaisen',
    image:
      'https://mangadex.org/covers/c52b2ce3-7f95-469c-96b0-479524fb7a1a/38e34e8a-0c77-4f1d-a112-a2adc4b74490.jpg',
    author: 'Lorem Ipsum',
    rate: 8.2,
    genre: 'Manhwa',
    chapters: [
      {
        id: 23,
        label: 'Chapter 23',
        date: new Date(new Date().setDate(new Date().getDate() - 4)),
      },
      {
        id: 24,
        label: 'Chapter 24',
        date: new Date(new Date().setDate(new Date().getDate() - 2)),
      },
    ],
  }

  // Generate 8 dummy series for trending
  const series = []
  for (let i = 1; i < 9; i++) {
    series.push({ ...manga, id: i })
  }

  return {
    data: series,
  }
})
