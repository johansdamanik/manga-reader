interface MangaDexResponse {
  data: Array<any>
  result: string
  response: string
  limit: number
  offset: number
  total: number
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = query.page ? Number(query.page) : 1
  const limit = 12
  const offset = (page - 1) * limit

  try {
    // Fetch manga list from MangaDex API
    const response = await $fetch<MangaDexResponse>(
      'https://api.mangadex.org/manga',
      {
        params: {
          limit,
          offset,
          hasAvailableChapters: 1, // Ensure manga has available chapters
          'availableTranslatedLanguage[]': ['en'],
          'order[latestUploadedChapter]': 'desc', // Order by latest chapter upload
          'contentRating[]': ['safe'],
          'includes[]': ['cover_art', 'author'],
        },
      },
    )

    // Map through the manga list and fetch their chapters
    const mangaList = await Promise.all(
      response.data.map(async (manga: any) => {
        const mangaId = manga.id
        const title =
          manga.attributes.title.en ||
          manga.attributes.title['ja-ro'] ||
          manga.attributes.altTitles?.find((alt: any) => alt.en)?.en ||
          'No Title Available'

        const type = manga.attributes.publicationDemographic || null

        // Get author
        const authorRelationship = manga.relationships.find(
          (rel: any) => rel.type === 'author',
        )
        const author = authorRelationship
          ? authorRelationship.attributes.name
          : 'Unknown Author'

        // Get cover image
        const coverArt = manga.relationships.find(
          (rel: any) => rel.type === 'cover_art',
        )
        const coverImage = coverArt
          ? `https://uploads.mangadex.org/covers/${mangaId}/${coverArt.attributes.fileName}.256.jpg`
          : null

        // Fetch 2 latest chapters for the manga
        const chaptersResponse = await $fetch<{ data: Array<any> }>(
          `https://api.mangadex.org/manga/${mangaId}/feed`,
          {
            params: {
              limit: 2,
              'translatedLanguage[]': ['en'],
              'order[chapter]': 'desc',
            },
          },
        )

        const chapters = chaptersResponse.data.map((chapter: any) => ({
          id: chapter.id,
          mangaId,
          title: chapter.attributes.title || 'No Title',
          chapter: chapter.attributes.chapter || 0,
          releaseDate: chapter.attributes.publishAt || 'Unknown Date',
        }))

        return {
          id: mangaId,
          title,
          author,
          type,
          coverImage,
          chapters,
        }
      }),
    )

    // Calculate total pages
    const totalPages = Math.ceil(response.total / limit)

    return {
      page,
      total: response.total,
      totalPages, // Add total pages to the response
      mangaList,
    }
  } catch (error) {
    console.error('Error fetching MangaDex data:', error)

    return {
      message: 'Internal Server Error',
      error: (error as any).message || error,
    }
  }
})
