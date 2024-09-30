import { MangaDetails, Chapter } from '~/server/types/manga'

export default defineEventHandler(
  async (event): Promise<MangaDetails | { message: string; error: string }> => {
    const id = getRouterParam(event, 'id')

    // Check if id is undefined or invalid
    if (!id) {
      return {
        message: 'Invalid Manga ID',
        error: 'Manga ID is required.',
      }
    }

    try {
      // Fetch manga details
      const mangaDetailsResponse = await $fetch<{ data: any }>(
        `https://api.mangadex.org/manga/${id}`,
        {
          params: {
            'includes[]': ['cover_art', 'author'],
          },
        },
      )

      const manga = mangaDetailsResponse.data

      // Title Handling
      const title =
        manga.attributes.title.en ||
        manga.attributes.title['ja-ro'] ||
        manga.attributes.altTitles?.find((alt: any) => alt.en)?.en ||
        'No Title Available'

      // Description Handling
      const description =
        manga.attributes.description?.en || 'No Description Available'

      // Cover Art Handling
      const coverArt = manga.relationships.find(
        (rel: any) => rel.type === 'cover_art',
      )
      const coverImage = coverArt
        ? `https://uploads.mangadex.org/covers/${manga.id}/${coverArt.attributes.fileName}`
        : null

      // Author Handling
      const authorRel = manga.relationships.find(
        (rel: any) => rel.type === 'author',
      )
      const author = authorRel ? authorRel.attributes.name : 'Unknown Author'

      // Genres Handling
      const genres = manga.attributes.tags
        .filter((tag: any) => tag.attributes.group === 'genre')
        .map((tag: any) => tag.attributes.name.en)

      // All Tags (including genres)
      const tags = manga.attributes.tags.map(
        (tag: any) => tag.attributes.name.en,
      )

      // Fetch Status and Release Date
      const status = manga.attributes.status || 'Unknown Status'
      const releaseDate = manga.attributes.year || 'Unknown Release Date'

      // Fetch Other Names (Alternative Titles)
      const otherNames = manga.attributes.altTitles.map(
        (altTitle: any) => Object.values(altTitle)[0] || 'Unknown Name',
      )

      // Function to fetch all chapters using the new /manga/{id}/feed endpoint
      const fetchAllChapters = async (id: string): Promise<Chapter[]> => {
        let chapters: Chapter[] = [] // Explicitly set the type to Chapter[]
        let totalChapters = 0
        let offset = 0
        const limit = 50 // Fetch chapters in batches of 50
        const chapterNumbers = new Set() // Track chapter numbers to avoid duplicates

        do {
          // Fetch chapters using the new /manga/{id}/feed endpoint
          const chaptersResponse = await $fetch<{ data: any[]; total: number }>(
            `https://api.mangadex.org/manga/${id}/feed`,
            {
              params: {
                limit,
                offset,
                'translatedLanguage[]': ['en'],
                'order[chapter]': 'desc',
              },
            },
          )

          // Add only unique chapters by checking chapter number
          chaptersResponse.data.forEach((ch: any) => {
            if (!chapterNumbers.has(ch.attributes.chapter)) {
              chapterNumbers.add(ch.attributes.chapter)
              chapters.push({
                id: ch.id,
                title: ch.attributes.title || 'No Title',
                chapter: ch.attributes.chapter || 'Unknown Chapter',
                mangaId: id,
                releaseDate: ch.attributes.publishAt || 'Unknown Date',
              })
            }
          })

          totalChapters = chaptersResponse.total
          offset += limit
        } while (offset < totalChapters) // Continue fetching until all chapters are retrieved

        return chapters
      }

      // Fetch all chapters for the manga
      const allChapters = await fetchAllChapters(id) // Now id is guaranteed to be a string

      const totalChapters = allChapters.length

      // Return the structured response with typing
      return {
        id: manga.id,
        title,
        description,
        coverImage,
        author,
        genres,
        tags, // Include all tags
        status, // Include status
        releaseDate, // Include release date
        otherNames, // Include alternative names
        chapters: allChapters, // Include all fetched chapters
        totalChapters,
      }
    } catch (error) {
      console.error('Error fetching manga details:', error)

      return {
        message: 'Internal Server Error',
        error: (error as any).message || error,
      }
    }
  },
)
