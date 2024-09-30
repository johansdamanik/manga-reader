import { ChapterDetails } from '~/server/types/manga' // Assuming you have defined the interfaces elsewhere

export default defineEventHandler(
  async (
    event,
  ): Promise<ChapterDetails | { message: string; error: string }> => {
    // Using getRouterParams to extract chapterId from the URL
    const { chapterId } = getRouterParams(event)

    if (!chapterId) {
      return {
        message: 'Invalid Chapter ID',
        error: 'Invalid Chapter ID',
      }
    }

    try {
      // Fetch the chapter details from the API
      const chapterDetailsResponse = await $fetch<{ data: any }>(
        `https://api.mangadex.org/chapter/${chapterId}`,
      )

      const chapter = chapterDetailsResponse.data

      // Get mangaId from the chapter's relationships
      const mangaRel = chapter.relationships.find(
        (rel: any) => rel.type === 'manga',
      )

      if (!mangaRel) {
        throw new Error('Manga relationship not found')
      }

      const mangaId = mangaRel.id

      // Fetch the manga details using mangaId
      const mangaDetailsResponse = await $fetch<{ data: any }>(
        `https://api.mangadex.org/manga/${mangaId}`,
      )

      const manga = mangaDetailsResponse.data

      // Get the manga title in 'en', fallback to 'ja-ro' if 'en' is not available
      const mangaTitle =
        manga.attributes.title.en ||
        manga.attributes.title['ja-ro'] ||
        manga.attributes.altTitles?.find((alt: any) => alt.en)?.en ||
        'No Title Available'

      // Fetch all chapters for the manga to get total chapters and chapter numbers
      const chaptersResponse = await $fetch<{ data: any[]; total: number }>(
        `https://api.mangadex.org/manga/${mangaId}/feed`,
        {
          params: {
            limit: 500,
            'translatedLanguage[]': ['en'],
            'order[chapter]': 'desc',
          },
        },
      )

      // Extract chapter numbers and chapter IDs
      const totalChapters = chaptersResponse.total
      const chapters = chaptersResponse.data.map((ch: any) => ({
        id: ch.id,
        chapter: ch.attributes.chapter || 'Unknown Chapter', // Extract chapter number
      }))

      // Fetch the server where images are stored for the chapter
      const serverResponse = await $fetch<{
        baseUrl: string
        chapter: { hash: string; dataSaver: string[] }
      }>(`https://api.mangadex.org/at-home/server/${chapterId}`)

      const { baseUrl, chapter: chapterImages } = serverResponse

      // Ensure that the necessary attributes exist
      if (
        !chapterImages ||
        !chapterImages.hash ||
        !chapterImages.dataSaver ||
        !Array.isArray(chapterImages.dataSaver)
      ) {
        throw new Error('Chapter images in data-saver mode are not available')
      }

      const hash = chapterImages.hash
      const dataSaverImages = chapterImages.dataSaver

      // Generate the URLs for the images in data-saver mode
      const imageUrls = dataSaverImages.map(
        (fileName: string) => `${baseUrl}/data-saver/${hash}/${fileName}`,
      )

      // Construct chapter details object with manga and chapter titles, images, total chapters, and chapter numbers
      const chapterDetails: ChapterDetails = {
        id: chapter.id,
        mangaTitle: mangaTitle, // Manga title (from 'en' or 'ja-ro')
        chapterTitle: chapter.attributes.title || 'No Chapter Title',
        chapter: chapter.attributes.chapter || 'Unknown Chapter',
        releaseDate: chapter.attributes.publishAt || 'Unknown Date',
        images: imageUrls,
        totalChapters: totalChapters, // Total chapters
        chapters: chapters, // Array of chapters with their IDs and numbers
      }

      return chapterDetails
    } catch (error) {
      console.error('Error fetching chapter data:', error)

      return {
        message: 'Failed to fetch chapter data',
        error: (error as any).message || error,
      }
    }
  },
)
