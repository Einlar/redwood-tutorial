import Comment from 'src/components/Comment'

export const QUERY = gql`
  query CommentsQuery($postId: Int!) {
    comments(postId: $postId) {
      id
      name
      body
      postId
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return <div className="text-center text-gray-500">No comments yet</div>
}

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ comments }) => {
  //Note: use top margin, not bottom margin, so that "this component influences just its own display", without affecting other components (e.g. the ones appearing below it)

  return (
    <div className="-mt-8">
      {comments.map((comment) => (
        <div key={comment.id} className="mt-8">
          <Comment comment={comment} />
        </div>
      ))}
    </div>
  )
}
