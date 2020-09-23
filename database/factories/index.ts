import Factory from '@ioc:Adonis/Lucid/Factory'
import Author from 'App/Models/Author'
import Post from 'App/Models/Post'

export const AuthorFactory = Factory.define(Author, ({ faker }) => {
  return {
    name: faker.random.word(),
  }
}).build()

export const PostFactory = Factory.define(Post, ({ faker }) => {
  return {
    title: faker.random.words(4),
    body: faker.lorem.paragraphs(3),
  }
})
  .relation('author', () => AuthorFactory)
  .build()
