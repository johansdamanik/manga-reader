export default defineEventHandler((event) => {
  const weeklySeries = [
    {
      id: 1,
      title: 'Jujutsu Kaisen',
      image:
        'https://mangadex.org/covers/c52b2ce3-7f95-469c-96b0-479524fb7a1a/38e34e8a-0c77-4f1d-a112-a2adc4b74490.jpg',
      author: 'Lorem Ipsum',
      rate: 8.2,
    },
    {
      id: 2,
      title: 'One Piece',
      image:
        'https://mangadex.org/covers/a1c7c817-4e59-43b7-9365-09675a149a6f/a4ab0d6b-6f05-4b51-b06d-2653663808e2.jpg',
      author: 'Lorem Ipsum',
      rate: 8.4,
    },
    {
      id: 3,
      title: 'Attack on Titan',
      image:
        'https://mangadex.org/covers/304ceac3-8cdb-4fe7-acf7-2b6ff7a60613/29f82b1d-b37f-455a-b630-e42bccb1422a.jpg',
      author: 'Lorem Ipsum',
      rate: 8.3,
    },
    {
      id: 4,
      title: 'Vinland Saga',
      image:
        'https://mangadex.org/covers/5d1fc77e-706a-4fc5-bea8-486c9be0145d/6c78781e-1c29-44cf-803a-8cfbc8a5f5c2.jpg',
      author: 'Lorem Ipsum',
      rate: 8.7,
    },
    {
      id: 5,
      title: 'Sousou no Frieren',
      image:
        'https://mangadex.org/covers/b0b721ff-c388-4486-aa0f-c2b0bb321512/f812f3d4-f1df-40ce-bd3c-dcc0fd0eb17b.jpg',
      author: 'Lorem Ipsum',
      rate: 8.7,
    },
  ]

  return {
    data: weeklySeries,
  }
})
