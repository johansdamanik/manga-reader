export interface Chapter {
  id: string
  title: string
  chapter: string
  mangaId: string
  releaseDate: string
}

export interface ChapterDetails {
  id: string
  mangaTitle: string
  chapterTitle: string
  chapter: string
  releaseDate: string
  totalChapters: number
  images: string[]
  chapters: any
}

export interface Manga {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  coverImage: string | null
  type: string | null
  rating: string
  author: string
  chapters: Chapter[]
}

export interface MangaDetails {
  id: string
  title: string
  description: string
  coverImage: string | null
  author: string
  genres: string[]
  tags: string[]
  status: string
  totalChapters: number
  releaseDate: string
  otherNames: string[]
  chapters: Chapter[]
}
