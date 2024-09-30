export default defineEventHandler((event) => {
  // Use real api fetch here
  const items = [
    {
      id: 1,
      title: 'Introducing Osamu Tezuka',
      subtitle: "Some manga's title",
      image:
        'https://mangadex.org/covers/c52b2ce3-7f95-469c-96b0-479524fb7a1a/38e34e8a-0c77-4f1d-a112-a2adc4b74490.jpg.512.jpg',
      action: {
        label: 'Read Now',
        url: '/manga/osamu-tezuka',
      },
    },
    {
      id: 2,
      title: 'Explore the World of Naruto',
      subtitle: 'Adventure awaits',
      image:
        'https://mangadex.org/covers/a1c7c817-4e59-43b7-9365-09675a149a6f/a4ab0d6b-6f05-4b51-b06d-2653663808e2.jpg.512.jpg',
      action: {
        label: 'Start Reading',
        url: '/manga/naruto',
      },
    },
    {
      id: 3,
      title: 'One Piece Treasure Hunt',
      subtitle: 'Join the journey',
      image:
        'https://mangadex.org/covers/304ceac3-8cdb-4fe7-acf7-2b6ff7a60613/29f82b1d-b37f-455a-b630-e42bccb1422a.jpg.512.jpg',
      action: {
        label: 'Join Now',
        url: '/manga/one-piece',
      },
    },
    {
      id: 4,
      title: 'Attack on Titan',
      subtitle: 'Defend humanity',
      image:
        'https://mangadex.org/covers/5d1fc77e-706a-4fc5-bea8-486c9be0145d/6c78781e-1c29-44cf-803a-8cfbc8a5f5c2.jpg.512.jpg',
      action: {
        label: 'Defend',
        url: '/manga/attack-on-titan',
      },
    },
  ]
  return { data: items }
})
