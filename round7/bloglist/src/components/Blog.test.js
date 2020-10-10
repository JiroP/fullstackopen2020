import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const handleUpdate = jest.fn()
  const handleDelete = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog
        blog={{
          title: 'Testing is fun',
          url: 'Url',
          author: 'Edgar',
          likes: 4,
          user: {
            name: 'Arto'
          }
        }}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        user={{}}
      />
    )
  })

  test('renders title and author at start', () => {
    expect(component.container).toHaveTextContent('Testing is fun')
    expect(component.container).toHaveTextContent('Edgar')
  })

  test('does not render url and likes at start', () => {
    expect(component.container).not.toHaveTextContent(4)
    expect(component.container).not.toHaveTextContent('Url')
  })

  test('shows likes and url after show button is clicked', () => {
    const showButton = component.getByText('view')
    fireEvent.click(showButton)

    expect(component.container).toHaveTextContent(4)
    expect(component.container).toHaveTextContent('Url')
  })

  test('clicking like button calls handleUpdate correctly', () => {
    const showButton = component.getByText('view')
    fireEvent.click(showButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    expect(handleUpdate.mock.calls).toHaveLength(1)

    fireEvent.click(likeButton)

    expect(handleUpdate.mock.calls).toHaveLength(2)
  })
})
