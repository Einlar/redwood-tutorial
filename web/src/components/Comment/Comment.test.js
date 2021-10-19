import { render, screen, waitFor } from '@redwoodjs/testing/web'

import Comment from './Comment'

const COMMENT = {
  name: 'John Doe',
  body: 'This is my comment',
  createdAt: '2020-01-02T12:34:56Z',
}

describe('Comment', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Comment comment={COMMENT} />)
    }).not.toThrow()

    expect(screen.getByText(COMMENT.name)).toBeInTheDocument()
    expect(screen.getByText(COMMENT.body)).toBeInTheDocument()

    const dateExpect = screen.getByText('2 January 2020')
    expect(dateExpect).toBeInTheDocument() //Date should be parsed correctly
    expect(dateExpect.nodeName).toEqual('TIME') //Date should be in a <time>
    expect(dateExpect).toHaveAttribute('datetime', COMMENT.createdAt) //The time.dateTime attribute should be correctly set
  })

  it('does not render a delete button if user is logged out', async () => {
    render(<Comment comment={COMMENT} />)

    //waitFor is needed because `hasRole` used in the `<Comment/>` to see if the user is a `moderator` or not makes a few GraphQL calls.
    await waitFor(() => {
      expect(screen.queryByText('Delete')).not.toBeInTheDocument()
    })
  })

  it('renders a delete button if the user is a moderator', async () => {
    mockCurrentUser({ roles: ['moderator'] })
    render(<Comment comment={COMMENT} />)

    await waitFor(() => expect(screen.getByText('Delete')).toBeInTheDocument()) //Note: not very robust! What if the comment have the text "Delete" in them?
  })
})
