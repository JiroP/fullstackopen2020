import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls handleCreate with correct inputs', () => {
    const handleCreate = jest.fn()
    const component = render(<BlogForm handleCreate={handleCreate} />)

    const titleInput = component.container.querySelector('[name="Title"]')
    const urlInput = component.container.querySelector('[name="Url"]')
    const authorInput = component.container.querySelector('[name="Author"]')

    fireEvent.change(titleInput, {
      target: { value: 'Testing forms is easy' }
    })

    fireEvent.change(urlInput, {
      target: { value: 'Url for tests' }
    })

    fireEvent.change(authorInput, {
      target: { value: 'Edgar' }
    })

    const form = component.container.querySelector('form')
    fireEvent.submit(form)

    expect(handleCreate.mock.calls).toHaveLength(1)
    expect(handleCreate.mock.calls[0][0].title).toEqual('Testing forms is easy')
    expect(handleCreate.mock.calls[0][0].author).toEqual('Edgar')
    expect(handleCreate.mock.calls[0][0].url).toEqual('Url for tests')
  })
})
