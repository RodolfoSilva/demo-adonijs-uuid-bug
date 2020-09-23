import test from 'japa'
import Database from '@ioc:Adonis/Lucid/Database'
import { AuthorFactory, PostFactory } from 'Database/factories'
import Author from 'App/Models/Author'
import Post from 'App/Models/Post'

test.group('Create Post', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test.failing(
    'check if the persisted id is the same returned by factory',
    async (assert) => {
      const author = await AuthorFactory.create()
      const persistedAuthor = (await Author.first())!

      assert.equal(author.id, persistedAuthor.id)
      assert.isString(author.id)
    }
  )

  test.failing(
    'check if the related author id is the same returned by factory',
    async (assert) => {
      const post = await PostFactory.with('author').create()
      const persistedPost = (await Post.query().first())!
      const author = (await Author.first())!

      assert.equal(post.author.id, persistedPost.authorId)

      assert.equal(persistedPost.authorId, author.id)
      assert.isString(persistedPost.authorId)
    }
  )
})
